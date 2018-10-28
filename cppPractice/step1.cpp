#include <iostream>
#include <vector>
#include <string>
using namespace std;
// 함수 분리좀...;;;
// vector의 타입을 클래스 포인터로 하고싶은데,,, 잘 모르겠네 ,,
// http://soen.kr/lecture/ccpp/cpp4/40-1-4.htm
class Account {
  private:
    int accId;
    int money;
    string userName;
  public:
    Account(int id, string name) {
      this->accId = id;
      this->money = 0; //초기값 0으로 셋팅
      this->userName = name;
    }
    int getAccid() {
      return this->accId;
    }
    int getMoney() {
      return this->money;
    }
    void setMoney(int newMoney) {
      this->money = newMoney;
    }
};

int main()
{
  int menu = 0;
  vector<Account> vt; // vector 의 타입을 Account 포인터 형태로 
  cout <<  "------Menu-----" << "\n";
  cout << "1. 계좌 개설" << "\n";
  cout << "2. 입금" << "\n";
  cout << "3. 출금" << "\n";
  cout << "4. 계좌정보 전체 출력" << "\n";
  cout << "5. 프로그램 종료" << "\n";

  while(menu!=5) {
    cout << "선택 : " << endl;
    cin >> menu;
    if(menu==1) {
      	int newId;
      	string name;

      	cout << "account id 입력 : " << endl;
      	cin >> newId;
		cout << "name 입력 : " << endl;
		cin >> name;
		vt.push_back(Account(newId,name));
    }else if(menu==2) {
      	int money;
      	int id;
      	cout << "[ 입   금 ]" << endl;
      	cout << "account id : "<<endl;
      	cin >> id;
      	cout << "입금 금액 : "<<endl;
      	cin >> money;

      	vector<Account>::iterator it;

     	for (it=vt.begin();it!=vt.end();it++) {
    		cout << (it->getAccid()) << endl;
       		if(it->getAccid() == id) {
         		int oldMoney = it->getMoney();
         		int newMoney = oldMoney+money;
         		it->setMoney( newMoney );

         		cout << "old money : "<< oldMoney << " new money :" << it->getMoney() << endl;
       		}
     	}
    }else if(menu==3) {
      //출금
      	int targetId;
      	int minusMoney;

      	cout << "[ 출   금 ]" << endl;
      	cout << "account id : " << endl;
      
      	cin >> targetId;
      	cout << "찾을 금액  : " << endl;
      	cin >> minusMoney;

      	vector<Account>::iterator it;

     	for (it=vt.begin();it!=vt.end();it++) {
    		cout << (it->getAccid()) << endl;
       		if(it->getAccid() == id && it->getMoney()) {
         		int oldMoney = it->getMoney();
         		int newMoney = oldMoney-money;
         		it->setMoney( newMoney );

         		cout << "old money : "<< oldMoney << " new money :" << it->getMoney() << endl;
       		}else {
				   cout << "invalid" << endl;
			}
     	}
     }
    }
     return 0;
  }

void makeAccount(vector<Account> acc) {
    int newId;
  	string name;
   
  	cout << "account id 입력 : " << endl;
  	cin >> newId;
	cout << "name 입력 : " << endl;
	cin >> name;
	acc.push_back(Account(newId,name));
}

void depositMoney(vector<Account> acc) {
    int money;
    int id;
    cout << "[ 입   금 ]" << endl;
    cout << "account id : "<<endl;
    cin >> id;
    cout << "입금 금액 : "<<endl;
    cin >> money;

    vector<Account>::iterator it;

    for (it=acc.begin();it!=acc.end();it++) {
    	cout << (it->getAccid()) << endl;
    	if(it->getAccid() == id) {
    		int oldMoney = it->getMoney();
     		int newMoney = oldMoney+money;
        	it->setMoney( newMoney );
         	cout << "old money : "<< oldMoney << " new money :" << it->getMoney() << endl;
       	}
    }	
}