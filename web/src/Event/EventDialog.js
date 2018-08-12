import React from "react";
import Modal from 'react-modal';
import { DateRangePicker, } from 'react-dates';
import axios from "axios/index";

class EventDialog extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      createMode : props.createMode,
      category    : 'Conference',
      name        : '',
      place       : '',
      address     : '',
      virtual     : false,
      startDate   : undefined,
      endDate     : undefined,
      processing  : false
    };
    if (!this.state.createMode){
      console.log(this.props.event)
      this.state.category    = this.props.event.category;
      this.state.name        = this.props.event.name;
      this.state.place       = this.props.event.place;
      this.state.address     = this.props.event.address;
      this.state.virtual     = this.props.event.virtual;
      // this.state.startDate   = this.props.event.startDate;
      // this.state.endDate     = this.props.event.endDate;
      this.state.processing  = this.props.event.processing;
    }
    this.handleInputChange      = this.handleInputChange.bind(this);
    this.submit                 = this.submit.bind(this);
    this.edit                   = this.edit.bind(this);
  }
  componentDidMount(){
    this.setState({virtual: this.state.virtual});
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }
  
  edit(e){
    e.preventDefault();
    let event = Object.assign({}, this.state);
    event.id = this.props.event.id;
    this.setState({processing : true}, () => {
      axios.put('/api/event', event)
        .then((response) => {
          this.setState({
            processing : false,
            category    : 'Conference',
            name        : '',
            place       : '',
            address     : '',
            virtual     : false,
            startDate   : undefined,
            endDate     : undefined
          });
          this.props.getUserEvents();
          this.props.closeModal();
        })
        .catch((error) => {
          console.log(error)
          this.showError(error.response && error.response.data ? error.response.data.error : error);
          this.setState({processing : false});
        });
    })
  }
  
  submit(e){
    e.preventDefault();
    let event = Object.assign({}, this.state);
    delete event.focusedInput;
    delete event.createMode;
    delete event.text;
    delete event.email;
    delete event.data;
    delete event.processing;
    this.setState({processing : true}, () => {
      axios.post('/api/event', event)
        .then((response) => {
          this.setState({
            processing : false,
            category    : 'Conference',
            name        : '',
            place       : '',
            address     : '',
            virtual     : false,
            startDate   : undefined,
            endDate     : undefined
          });
          this.props.getUserEvents();
          this.props.closeModal();
        })
        .catch((error) => {
          console.log(error)
          this.showError(error.response && error.response.data ? error.response.data.error : error);
          this.setState({processing : false});
        });
    })
  }
  
  render(){
    return(
      <Modal
        isOpen={this.props.modal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div >
          <h2 className="sameLineModal">
            {this.state.createMode ? 'Create an event' : 'Edit an event'}
          </h2>
          <button className="sameLineModal pull-right" onClick={this.props.closeModal}>close</button>
        </div>
        <form role="form" id="loginForm" onSubmit={this.state.createMode ? this.submit : this.edit}>
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
              startDate={this.state.startDate}
              startDateId="your_unique_start_date_id"
              endDate={this.state.endDate}
              endDateId="your_unique_end_date_id"
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
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
                   required/>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input className="form-control" onChange={(e) => this.setState({address: e.target.value})}
                   value={this.state.address}
                   name="address" type="text" id="addressField"
                   required/>
          </div>
          <div className="form-group">
            <label htmlFor="ckField" className="sameLineModal">Is the event virtual?</label>
            <input className="form-control sameLineModal cb"
                   checked={this.state.virtual}
                   value={this.state.virtual}
                   onChange={this.handleInputChange}
                   name="virtual" type="checkbox" id="ckField"/>
          </div>
      
          <button id="signupButton" type="submit"
                  disabled={this.state.processing}
                  className="btn btn-lg btn-success btn-block">
            {this.state.processing ?
              <img id="loadingSpinner"
                   src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="28" height="28"/>
              :
              <span>{this.state.createMode ? 'Create' : 'Save'}</span>
            }
          </button>
        </form>
      </Modal>
    );
  }
}

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

export default EventDialog;