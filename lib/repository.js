function Repo() {
    this.data = [
        { id:1, name: 'Mr. Robel', address: 'Cumilla', number: '0190000000', picture: "Images/h.jpg", roomId:'011',date: new Date('2017-01-01') , price: '3500' },
        { id:2, name: 'Jr. Russell', address: 'Dhaka-1320', number: '016000000', picture: "Images/m.jpg",roomId:'012',date: new Date('2017-01-01'), price: '2500' },
        { id:3, name: 'Juli', address: 'Chattrogram', number: '015000000', picture: "Images/j.jpg",roomId:'013',date: new Date('2017-01-01'), price: '3500' }
    ];


    this.get = (id)=>{
        var data= this.data.filter(p=> p.id == id);
        /*console.log(id);
        console.log(x);
        return x;*/ 
        if(data && data.length) return data[0];
        else return null;
      }

	this.insert = (emp) => {
        this.data.push(emp);
    }

    this.update = (id, v) => {
        var data= this.data.filter(p=> p.id == id);
        if(data || data.length)
        {
          data[0].name=v.name;
          data[0].address =v.address;
          data[0].number = Number(v.number);
          data[0].roomId = Number(v.roomId);
          data[0].date = new Date(v.date);
          data[0].price = Number(v.price);
          console.log(this.data);
        }
      };   

}
module.exports.repo = new Repo();
