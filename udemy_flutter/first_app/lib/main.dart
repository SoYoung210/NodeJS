import 'package:flutter/material.dart';

main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  List<String> products = ['Food Tester'];
  Widget build(context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: Text('data'),
          ),
          body: Column(children: [
            Container(
                margin: EdgeInsets.all(10.0),
                child: RaisedButton(
                    onPressed: () {
                      setState(() {
                        products.add('Advanced');
                      });
                    },
                    child: Text('Add Product'))),
            Column(
              children: products
                  .map((element) => Card(
                        child: Column(
                          children: <Widget>[
                            Image.asset('assets/food.jpg'),
                            Text(element)
                          ],
                        ),
                      ))
                  .toList(),
            )
          ])),
    );
  }
}
