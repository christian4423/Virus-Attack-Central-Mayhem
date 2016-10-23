var TASK = function(string) {
    console.log(`Task: "${string}" created.`);
    let obj = {
      name: string
    }
    this.makeEstimate = function(b, p, w) {
      obj.time = {
          B: b, //best-case */5
          P: p, //worse-case */5
          weight: w //priority */5
      };
        return obj;
    };
    this.estimateTime = function(){
      if(obj.time){
        let time = obj.time,
            P = 4 * time.P,
            BW = time.B + time.weight,
            top = P + BW,
            total = top / 6,
            rounded = Math.round(total),
            roundedUP = Math.ceil(total);

        obj.time.total = {rounded,total, rounded_up: roundedUP};

        return obj;
      }else{
        console.log('Please enter time estimates');
        return false;
      }
    };
    this.print = function(){
      console.log(JSON.stringify(obj, null, 3));
    };
};
