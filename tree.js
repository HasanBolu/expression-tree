const assert = require("assert");

const ADDITION = "+";
const SUBSTRACTION = "-";
const MULTIPLACTION = "x";
const DIVISION = "÷";
const EMPTY = "";

const Addition = function(left, right){
    this.result = () => left.result() + right.result();
    this.toString = () => `(${left.toString()} ${ADDITION} ${right.toString()})`
}

const Substraction = function(left, right){
    this.result = () => left.result() - right.result();
    this.toString = () => `(${left.toString()} ${SUBSTRACTION} ${right.toString()})`
}

const Multiplaction = function(left, right){
    this.result = () => left.result() * right.result();
    this.toString = () => `(${left.toString()} ${MULTIPLACTION} ${right.toString()})`
}

const Division = function(left, right){
    this.result = () => left.result() / right.result();
    this.toString = () => `(${left.toString()} ${DIVISION} ${right.toString()})`
}

const DefaultOperator = function(value){
    this.result = () => value;
    this.toString = () => value.toString();
}

const OperatorFactory = function(){
    this.createOperator = (operator, value, left, right) => {
        switch (operator) {
            case ADDITION:
              return new Addition(left, right);
            case SUBSTRACTION:
              return new Substraction(left, right);
            case MULTIPLACTION:
              return new Multiplaction(left, right);
            case DIVISION:
              return new Division(left, right);
            default:
              return new DefaultOperator(value);
          }
    }
} 

const Node = (operator, value, left = null, right = null) => {
  const operatorFactory = new OperatorFactory();
  
  return operatorFactory.createOperator(operator, value, left, right);
};

const tree = Node(
  DIVISION,
  null,
  Node(
    ADDITION,
    null,
    Node(EMPTY, 7),
    Node(
      MULTIPLACTION,
      null,
      Node(SUBSTRACTION, null, Node(EMPTY, 3), Node(EMPTY, 2)),
      Node(EMPTY, 5)
    )
  ),
  Node(EMPTY, 6)
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());

console.log(tree.toString())
console.log(tree.result())