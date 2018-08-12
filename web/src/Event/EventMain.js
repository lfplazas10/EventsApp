import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import 'react-dates/lib/css/_datepicker.css';
import './Events.css'
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { isUserLogged } from '../Auth.js'
import EventDialog from "./EventDialog";

class EventMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data        : [],
      category    : 'Conference',
      name        : '',
      place       : '',
      address     : '',
      virtual     : false,
      startDate   : undefined,
      endDate     : undefined,
      createModal : false,
      email       : '',
      password    : '',
      processing  : false
    };
    this.getUserEvents          = this.getUserEvents.bind(this);
    this.deleteEvent            = this.deleteEvent.bind(this);
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
    this.hideAlert              = this.hideAlert.bind(this);
    this.showEditDialog         = this.showEditDialog.bind(this);
    this.closeEventDialog       = this.closeEventDialog.bind(this);
  }
  
  hideAlert() {
    this.setState({ alert: null });
  }
  
  componentDidMount(){
    this.getUserEvents();
  }
  
  componentDidUpdate(){
    if (!isUserLogged())
      this.props.history.push('/login')
  }
  
  closeEventDialog(name){
    this.setState({[name] : null})
  }
  
  showError(message){
    this.setState({ alert:
        <SweetAlert
          error
          confirmBtnText="Ok"
          confirmBtnBsStyle="danger"
          title="Error"
          onConfirm={this.hideAlert}
          onCancel={this.hideAlert}
        >
          {'Message: '+message}
        </SweetAlert>
    });
  }
  
  getUserEvents(){
    axios.get('/api/event')
      .then((response) => {
        this.setState({ data : response.data});
      })
      .catch((error) => {
        this.showError(error.response && error.response.data ? error.response.data.error : error);
        this.setState({processing : false});
      });
  }
  
  deleteEvent(event){
    axios.delete('/api/event/'+event.id)
      .then((response) => {
        this.setState({alert : null});
        this.getUserEvents();
      })
      .catch((error) => {
        this.showError(error.response && error.response.data ? error.response.data.error : error);
        this.setState({alert : null});
      });
  }
  
  showEditDialog(){
    this.setState({ editModal: true})
  }
  
  showDeleteConfirmation(event){
    this.setState({ alert: <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={() => this.deleteEvent(event)}
        onCancel={this.hideAlert}
      >
        This will delete the event.
      </SweetAlert>})
  }
  
  render(){
    return(
      <div className='containerEvents'>
          <button className='' onClick={()=>this.setState({createModal : true})}>
            Create new event
          </button>
        <div >
          <ReactTable
            data={this.state.data}
            columns={[{
              Header: 'Name',
              accessor: 'name'
            }, {
              Header: 'Category',
              accessor: 'category',
              minWidth: 110,
              maxWidth: 110,
              Cell: props => <div className='numberCe'>{props.value}</div>
            },{
              Header: 'Place',
              accessor: 'place',
              Cell: props => <div className='numberCe'>{props.value}</div> // Custom cell components!
            },{
              Header: 'Address',
              accessor: 'address',
              Cell: props => <div className='numberCe'>{props.value}</div> // Custom cell components!
            },{
              id: 'dates',
              Header: 'Dates',
              minWidth: 170,
              maxWidth: 170,
              accessor: d => new Date(d.startDate*1000).toLocaleString().split(',')[0]+' - '+ new Date(d.endDate*1000).toLocaleString().split(',')[0],
              Cell: props => <div className='numberCe'>{props.value}</div> // Custom cell components!
            }, {
              Header: 'Virtual',
              accessor: 'virtual',
              minWidth: 70,
              maxWidth: 70,
              Cell: props => <div className='numberCe'>{props.value? 'True' : 'False'}</div> // Custom cell components!
            },{
              id: 'actions',
              Header: 'Actions',
              minWidth: 132,
              maxWidth: 132,
              accessor: d => d,
              Cell: props => <div><button className='edButton' onClick={() => this.setState({editEvent: props.value})}>EDIT</button><button className='deButton' onClick={() => this.showDeleteConfirmation(props.value)}>DELETE</button>{this.state.alert}</div>
            }]}
            defaultPageSize={10}
            style={{
              height: "100%"
            }}
            className="-striped -highlight"
          />
        </div>
        {this.state.createModal && <EventDialog
          modal={this.state.createModal}
          getUserEvents={this.getUserEvents}
          closeModal={() => this.closeEventDialog('createModal')}
          createMode={true}/> }
        {this.state.editEvent && <EventDialog
          modal={this.state.editEvent}
          event={this.state.editEvent}
          getUserEvents={this.getUserEvents}
          closeModal={() => this.closeEventDialog('editEvent')}
          createMode={false}/> }
      </div>
    )
  }
}

export default EventMain;