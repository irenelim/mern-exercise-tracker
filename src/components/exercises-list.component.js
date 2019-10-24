import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = ({exercise, deleteExercise})=>{
    return (
    <tr>
        <td>{exercise.username}</td>
        <td>{exercise.description}</td>
        <td>{exercise.duration}</td>
        <td>{exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+exercise._id}>edit</Link> | <a href="#" onClick={() => { deleteExercise(exercise._id) }}>delete</a>
        </td>
    </tr>
    )
};

const ExercisesList = (props)=> {

    const [exercises, setExercises] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            const result = await axios('http://localhost:5000/exercises/');
            setExercises(result.data);
          };
          fetchData();
  
        // axios.get('http://localhost:5000/exercises/')
        //     .then(response => {
        //         setExercises({exercises: response.data});
        //         console.log(response.data);
        //     })
        //     .catch(error=>console.log(error));

    }, []);

    const deleteExercise = (id) => {
        const deleteData = async () =>{
          const result = await axios.delete('http://localhost:5000/exercises/'+id);
          if (result.data === 'Exercise deleted.')
            setExercises([...exercises.filter(exercise => exercise._id !== id)]);
          };
        deleteData();
         
        // axios.delete('http://localhost:5000/exercises/'+id)
        //     .then(response => { console.log(response.data)});
    
        // setExercises({...exercises.filter(el => el._id == id)
        // })
        setExercises([...exercises.filter(exercise => exercise._id !== id)]);
        
    };

    // const exerciseList = () => {
    //     return exercises.map(currentexercise => {
    //       <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
    //     })
    // };
    
    // const exerciseList = () => {        
        // exercises.map((currentexercise, index) =>( 
        //         <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>
        //     ))
    // };
    return (
        <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                exercises.map((currentexercise, index) =>( 
                    <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>
                ))
             }
          </tbody>
        </table>
      </div>
    )

};
export default ExercisesList;

// const Exercise = props => (
//   <tr>
//     <td>{props.exercise.username}</td>
//     <td>{props.exercise.description}</td>
//     <td>{props.exercise.duration}</td>
//     <td>{props.exercise.date.substring(0,10)}</td>
//     <td>
//       <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
//     </td>
//   </tr>
// )

// export default class ExercisesList extends Component {
//   constructor(props) {
//     super(props);

//     this.deleteExercise = this.deleteExercise.bind(this)

//     this.state = {exercises: []};
//   }

//   componentDidMount() {
//     axios.get('http://localhost:5000/exercises/')
//       .then(response => {
//         this.setState({ exercises: response.data })
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }

//   deleteExercise(id) {
//     axios.delete('http://localhost:5000/exercises/'+id)
//       .then(response => { console.log(response.data)});

//     this.setState({
//       exercises: this.state.exercises.filter(el => el._id !== id)
//     })
//   }

//   exerciseList() {
//     return this.state.exercises.map(currentexercise => {
//       return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
//     })
//   }

//   render() {
//     return (
//       <div>
//         <h3>Logged Exercises</h3>
//         <table className="table">
//           <thead className="thead-light">
//             <tr>
//               <th>Username</th>
//               <th>Description</th>
//               <th>Duration</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             { this.exerciseList() }
//           </tbody>
//         </table>
//       </div>
//     )
//   }
// }