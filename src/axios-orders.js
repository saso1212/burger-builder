import axios from 'axios';

const instace=axios.create({
    baseURL:'https://react-my-burger-f3c90.firebaseio.com/'
});

export default instace;
