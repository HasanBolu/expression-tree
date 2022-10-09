const assert = require("assert");

const ADDITION = "+";
const SUBSTRACTION = "-";
const MULTIPLACTION = "x";
const DIVISION = "÷";

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

const OperatorFactory = function(){
    this.createOperator = (operator, left, right) => {
        switch (operator) {
            case ADDITION:
              return new Addition(left, right);
            case SUBSTRACTION:
              return new Substraction(left, right);
            case MULTIPLACTION:
              return new Multiplaction(left, right);
            case DIVISION:
              return new Division(left, right);
          }
    }
} 

const OperatorNode = (operator, left, right) => {
  const operatorFactory = new OperatorFactory();
  
  return operatorFactory.createOperator(operator, left, right);
};

const ValueNode = (value) => {
    const toString = () => value.toString();
    const result = () => value;

    return { toString, result };
}

const tree = OperatorNode(
  DIVISION,
  OperatorNode(
    ADDITION,
    ValueNode(7),
    OperatorNode(
      MULTIPLACTION,
      OperatorNode(SUBSTRACTION, ValueNode(3), ValueNode(2)),
      ValueNode(5)
    )
  ),
  ValueNode(6)
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());