import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = props => {
    const [exercise, setExercise] = useState({
        description: '',
        duration: 0,
        date: new Date(),
        username: '',
        users:[]
    });

    const userInputRef = useRef(null);    

    useEffect(()=>{ 
      const fetchData = async () =>{
        const users = axios.get('http://localhost:5000/users/');
        const exerciseResult = axios.get('http://localhost:5000/exercises/'+props.match.params.id);
        await users;
        await exerciseResult;
        
        setExercise({
            users: users.data.map(user => user.username),
            username: exerciseResult.data.username,
            description: exerciseResult.data.description,
            duration: exerciseResult.data.duration,
            date: new Date(exerciseResult.data.date)
        });
        
      };
      fetchData();
      // axios.get('http://localhost:5000/users/')
      //       .then(res =>{
      //           if (res.data.length > 0){                  
      //               setExercise({
      //                   ...exercise,
      //                   users: res.data.map(user => user.username)
      //               });                    
      //           }                
      //       })
      //       .catch(error=>console.log(error));


        // axios.get('http://localhost:5000/exercises/'+props.match.params.id)
        // .then(response => {
        //   console.log(response.data);
        //     setExercise({...exercise,
        //     username: response.data.username,
        //     description: response.data.description,
        //     duration: response.data.duration,
        //     date: new Date(response.data.date)
        //     })   
            
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });   
        userInputRef.current.focus();
        
    }, []);   

    const onChange = (e)=>{
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        });
    };

    const onChangeDate = (date)=>{
        setExercise({
            ...exercise,
            date: date
        });
    };

    const onSubmit = (e)=>{
        e.preventDefault();
        // console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+ props.match.params.id, exercise)
            .then(res=>{
              console.log(res.data);
              window.location = "/";
            });
    };

    return (
        <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
              required
              className="form-control"
              name="username"
              value={exercise.username}
              ref={userInputRef}
              onChange={onChange}>
              {
                exercise.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              name = "description"
              value={exercise.description}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              name="duration"
              value={exercise.duration}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={exercise.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
};

export default EditExercise;




// export default class EditExercise extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeDuration = this.onChangeDuration.bind(this);
//     this.onChangeDate = this.onChangeDate.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       username: '',
//       description: '',
//       duration: 0,
//       date: new Date(),
//       users: []
//     }
//   }

//   componentDidMount() {
//     axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
//       .then(response => {
//         this.setState({
//           username: response.data.username,
//           description: response.data.description,
//           duration: response.data.duration,
//           date: new Date(response.data.date)
//         })   
//       })
//       .catch(function (error) {
//         console.log(error);
//       })

//     axios.get('http://localhost:5000/users/')
//       .then(response => {
//         if (response.data.length > 0) {
//           this.setState({
//             users: response.data.map(user => user.username),
//           })
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })

//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     })
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value
//     })
//   }

//   onChangeDuration(e) {
//     this.setState({
//       duration: e.target.value
//     })
//   }

//   onChangeDate(date) {
//     this.setState({
//       date: date
//     })
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const exercise = {
//       username: this.state.username,
//       description: this.state.description,
//       duration: this.state.duration,
//       date: this.state.date
//     }

//     console.log(exercise);

//     axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
//       .then(res => console.log(res.data));

//     window.location = '/';
//   }

//   render() {
//     return (
//     <div>
//       <h3>Edit Exercise Log</h3>
//       <form onSubmit={this.onSubmit}>
//         <div className="form-group"> 
//           <label>Username: </label>
//           <select ref="userInput"
//               required
//               className="form-control"
//               value={this.state.username}
//               onChange={this.onChangeUsername}>
//               {
//                 this.state.users.map(function(user) {
//                   return <option 
//                     key={user}
//                     value={user}>{user}
//                     </option>;
//                 })
//               }
//           </select>
//         </div>
//         <div className="form-group"> 
//           <label>Description: </label>
//           <input  type="text"
//               required
//               className="form-control"
//               value={this.state.description}
//               onChange={this.onChangeDescription}
//               />
//         </div>
//         <div className="form-group">
//           <label>Duration (in minutes): </label>
//           <input 
//               type="text" 
//               className="form-control"
//               value={this.state.duration}
//               onChange={this.onChangeDuration}
//               />
//         </div>
//         <div className="form-group">
//           <label>Date: </label>
//           <div>
//             <DatePicker
//               selected={this.state.date}
//               onChange={this.onChangeDate}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
//         </div>
//       </form>
//     </div>
//     )
//   }
// }