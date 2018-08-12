import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Modal from 'react-modal';
import { DateRangePicker, } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './Events.css'
import axios from 'axios';
import {isUserLogged} from '../Auth.js'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '500px',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
const columns = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
}, {
  Header: 'Category',
  accessor: 'category',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
},{
  Header: 'Place',
  accessor: 'place',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
},{
  Header: 'Address',
  accessor: 'address',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
},{
  id: 'dates',
  Header: 'Dates',
  accessor: d => d.dates.startDate +' - '+ d.dates.endDate,
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  Header: 'Virtual',
  accessor: 'age',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
},{
  Header: 'Actions',
  Cell: props => <span className='number'><button>EDIT</button><button>DELETE</button></span> // Custom cell components!
}];

const data = [{
  name: 'Tanner Linsley',
  age: 26,
  friend: {
    name: 'Jason Maurer',
    age: 23,
  },
  dates: {
    startDate: '1',
    endDate: '2'
  }
}]

class EventMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category    : 'Conference',
      name        : '',
      place       : '',
      address     : '',
      virtual     : false,
      startDate   : undefined,
      endDate     : undefined,
      modal       : true,
      email       : '',
      password    : '',
      processing  : false
    };
    this.handleInputChange   = this.handleInputChange.bind(this);
    this.submit              = this.submit.bind(this);
    // this.showError    = this.showError.bind(this);
  }
  
  componentDidUpdate(){
    if (!isUserLogged())
      this.props.history.push('/login')
  }
  
  openModal() {
    this.setState({modal: true});
  }
  
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
  
  closeModal() {
    this.setState({modal: false});
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }
  
  submit(e){
    e.preventDefault();
    let event = Object.assign({}, this.state);
    delete event.focusedInput;
    delete event.modal;
    delete event.text;
    delete event.email;
    delete event.processing;
    this.setState({processing : true}, () => {
      axios.post('/api/event', event)
        .then((response) => {
          // window.location.reload();
          console.log(response)
          this.setState({processing : false});
        })
        .catch((error) => {
          this.showError(error.response && error.response.data ? error.response.data.error : error);
          this.setState({processing : false});
        });
    })
  }
  
  render(){
    return(
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={20}
          style={{
            height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
        />
        <Modal
          isOpen={this.state.modal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={()=>this.setState({modal: false})}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div >
            <h2 className="sameLineModal">Create an event</h2>
            <button className="sameLineModal pull-right" onClick={this.closeModal}>close</button>
          </div>
          <form role="form" id="loginForm" onSubmit={this.submit}>
            <div className="form-group">
              <label>Name</label>
              <input className="form-control" onChange={(e) => this.setState({name: e.target.value})}
                     value={this.state.name}
                     name="name" type="text" id="nameField"
                     required
                     autoFocus/>
            </div>
            <div className="form-group">
              <label>{'Dates  '+'  '}</label>
              <DateRangePicker
                required={true}
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control form-control-lg" value={this.state.category}
                      onChange={(e) => this.setState({category: e.target.value})} required>
                <option value="Conference">Conference</option>
                <option value="Seminar">Seminar</option>
                <option value="Congress">Congress</option>
                <option value="Class">Class</option>
              </select>
            </div>
            <div className="form-group">
              <label>Place</label>
              <input className="form-control" onChange={(e) => this.setState({place: e.target.value})}
                     value={this.state.place}
                     name="place" type="text" id="placeField"
                     required
                     autoFocus/>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input className="form-control" onChange={(e) => this.setState({address: e.target.value})}
                     value={this.state.address}
                     name="address" type="text" id="addressField"
                     required
                     autoFocus/>
            </div>
            <div className="form-group">
              <label htmlFor="ckField" className="sameLineModal">Is the event virtual?</label>
              <input className="form-control sameLineModal cb" onChange={(e) => this.setState({email: e.target.value})}
                     value={this.state.virtual}
                     onChange={this.handleInputChange}
                     placeholder="Email" name="text" type="checkbox" id="ckField"
                     autoFocus/>
            </div>
            
            <button id="signupButton" type="submit"
                    disabled={this.state.processing}
                    className="btn btn-lg btn-success btn-block">
              {this.state.processing ?
                <img id="loadingSpinner"
                     src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="28" height="28"/>
                :
                <span>Create</span>
              }
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default EventMain;