# YAPP Project를 하면서.. 
[project repo link](https://github.com/YAPP13-4/semi-basement)
프로젝트를 진행하며 느꼈던 점을 정리하는 글이다. 

## 설계의 문제. 
개발을 주로 혼자 진행하다 보니, 우선 빠른 기능 구현에 초점을 맞추었다. 
그러다 보니, 처음의 Player(ReactPlayer lib 사용)에서 실제 요구사항에 맞춘 MusicPlayer 로 옮길 때, redux store가 상당히 이상하고 폐쇄적인 구조를 갖게 되었다.

### 초기 코드 

```jsx
class BottomPlayer extends Component {
    render() {
        return (
          <div className={cx(`${moduleName}`)}>
            <ReactPlayer className={cx(`${moduleName}-player`)} url={first} controls={true}/>
          </div>
        )
      }
}
    
export default BottomPlayer
```

```jsx
  { /*action dispatch 부분*/ }
  _fetchSong = () => {
    this.props.selectSong(this.props.songId);
  };
```
### 실제 코드 
`PlayerContainer` : action dispatch등의 처리를 해주는 컨테이너이다. 
`Player` : audio 부분을 제외한 music player에 필요한 부분을 그려주는 컴포넌트이다.
`audio` : html5 audio 태그를 활용하기 위해 audio.js 를 따로 생성하고, Player 컴포넌트를 InnerComponent로 갖는다. 

```jsx
{ /*Player.js*/ }
const Player = ({
  meta,
  song,
  player,
  changeCurrentTime,
  togglePlay,
  toggleHistory,
  playNextSongFromButton
}) => {
  const artworkUrl = song[2];
  const title = song[1];
  const duration = song[3];
  const { currentTime } = player;
```
Music Player란 기본적으로 사용자가 선택한 곡의 정보를 가져와서 그려주는 역할을 한다.  
필요한 정보는 artwork, title, duration 의 정보가 필수적으로 요구되었다.  

`사용자가 선택한 곡` 은 `music/action.js` 의 `selectSong` 에서 dispatch 된다.  
이를 위해 **사용자가 곡을 선택하는 모든 부분** 에서 곡의 정보를 배열에 담아 selectSong에 담아 넘겨주어야 한다. 

### 너무 많은 비동기 호출
코드의 많은 부분이 ajax 요청이다.  
처음부터 redux-saga를 얹고 갔으면 좋았겠다라는 생각을 한다.  

다양한 컴포넌트에서 중복코드가 존재하고, 이 부분은 `Util` 로 정리되어야 하는 부분이다..

### LifeCycle 지식 부족 

가장 이상하다고 생각하는 컴포넌트의 코드이다.. 

```jsx
class HistoryTab extends Component {
  constructor(props) {
    super(props)
    console.log("constructor props ", props)
    this.state = {
      songId: [props.historySong],
      songData: []
    }
    console.log(this.state.songId)
    this.getHistorySong()
  }
  //그려지고 난 다음에 localStorage 랑 동기화
  componentDidMount() {
    //cart state가 local storage에 있으면 불러오기
    let localHistory = localStorage.historySong
    console.log("local history", localHistory)
    if (localHistory) {
      this.setState({
        songId: JSON.parse(localHistory)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.songId !== this.state.songId) {
      localStorage.historySong = JSON.stringify(this.state.songId)
      //TODO : fix ..where..calll.... getHistorySong
      this.getHistorySong()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //songId 에 새로 추가한 곡이 없으면
    let prevSongId = prevState.songId
    const is = prevSongId.some(item => {
      return item === nextProps.historySong
    })
    if (!is) {
      console.log("not contains")
      return {
        ...prevState,
        songId: [...prevState.songId, nextProps.historySong]
      }
    } else {
      return null
    }
  }
```
