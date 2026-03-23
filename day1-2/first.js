


const obj1 = {
  name: "Alice",
  greet: () => {
    console.log("Hello " + this.name);
  }
};

obj1.greet();


const obj = {
  name: "Alice",
  greet: function() {
    console.log("Hello " + this.name);
  }
};

obj.greet();