import 'package:flutter/material.dart';

main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('data'),
        ),
        body: Card(
          child: Column(
            children: <Widget>[
              Image.asset('assets/food.jpg'),
              Text('Food Paradise')
            ],
          ),
        ),
      ),
    );
  }
}
