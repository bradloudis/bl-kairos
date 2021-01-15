import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// MATERIAL-UI
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';

// material-ui for dummy card
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from '@material-ui/core';

class VolunteerProfile extends Component {
  state = {
    editActivitiesBtnSelected: false,
    editContactBtnSelected: false,
    editActivitiesSelected: [],
    user_email: '',
    user_phone: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PREF_ACTIVITIES',
    });

    // gets all activities to map through and display as checkboxes for edit
    this.props.dispatch({
      type: 'GET_ACTIVITIES',
    });
  }

  handleEditActivities = () => {
    this.setState({
      editActivitiesBtnSelected: true,
    });
  };

  handleEditContact = () => {
    this.setState({
      editContactBtnSelected: true,
    });
  };

  handleSubmitContact = () => {
    this.setState({
      editContactBtnSelected: false,
    });
    console.log(this.state.user_email);
    console.log(this.state.user_phone);
  };

  handleSubmitActivities = () => {
    this.setState({
      editActivitiesBtnSelected: false,
    });
    // data to be posted - this.state.editActivitiesSelected
    // data to be deleted - actDeleteArray
    const actDeleteArray = [];
    for (
      let i = 0;
      i < this.props.store.activities.prefActivityList.length;
      i++
    ) {
      actDeleteArray.push(
        this.props.store.activities.prefActivityList[i].activity_type_id
      );
    }

    this.props.dispatch({
      type: 'UPDATE_PREF_ACTIVITIES',
      payload: {
        deleteArray: actDeleteArray,
        postArray: this.state.editActivitiesSelected,
      },
    });
  };

  handleCancelClickActivity = () => {
    this.setState({
      editActivitiesBtnSelected: false,
    });
  };

  handleCancelClickContact = () => {
    this.setState({
      editContactBtnSelected: false,
    });
  };

  handleCheckBoxes = (event) => {
    let newActivity = parseInt(event.target.value);
    const isSelected = event.target.checked;

    if (isSelected === true) {
      this.setState({
        ...this.state,
        editActivitiesSelected: [
          ...this.state.editActivitiesSelected,
          newActivity,
        ],
      });
    } else if (isSelected === false) {
      const actArray = this.state.editActivitiesSelected;
      const updatedActivities = actArray.filter((item) => {
        return item !== newActivity;
      });
      this.setState({
        ...this.state,
        editActivitiesSelected: updatedActivities,
      });
    }
  };

  handleTextFieldChange = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };
  render() {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={2}>
              <Typography variant="h2" component="h2" align="center">
                Thank you for being a volunteer
              </Typography>
              <Typography variant="h2" component="h2" align="center">
                We appreciate you!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Typography variant="h3" component="h3">
                  Hello {this.props.store.user.first_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5}>
                {this.state.editContactBtnSelected === false ? (
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="h5" component="h5">
                        EMAIL
                      </Typography>
                      <Typography variant="body1" component="p">
                        {this.props.store.user.email_address}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5" component="h5">
                        PHONE
                      </Typography>
                      <Typography variant="body1" component="p">
                        {this.props.store.user.phone_number}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          onClick={this.handleEditContact}
                        >
                          EDIT
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item xs={6}>
                      <TextField
                        label={this.props.store.user.email_address}
                        value={this.state.user_email}
                        onChange={this.handleTextFieldChange('user_email')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={this.props.store.user.phone_number}
                        value={this.state.user_phone}
                        onChange={this.handleTextFieldChange('user_phone')}
                      />
                    </Grid>
                    <Box mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={this.handleCancelClickContact}
                          >
                            CANCEL
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={this.handleSubmitContact}
                          >
                            SUBMIT
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Grid item lg={7}>
                <Typography variant="h5" component="h5">
                  MY PREFERRED ACTIVITY TYPES
                </Typography>
                {this.state.editActivitiesBtnSelected === false ? (
                  // map through preferred activities
                  <div>
                    {this.props.store.activities.prefActivityList.map(
                      (item, index) => {
                        return (
                          <Typography variant="body1" component="p" key={index}>
                            {item.activity_name}
                          </Typography>
                        );
                      }
                    )}
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        onClick={this.handleEditActivities}
                      >
                        EDIT
                      </Button>
                    </Box>
                  </div>
                ) : (
                  <div>
                    {/* below is code for the edit activity pref. checkboxes */}
                    <Grid container spacing={2} item xs={12}>
                      {this.props.store.activities.activityList.map(
                        (item, index) => {
                          return (
                            <Grid item xs={3} key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      this.state.editActivitiesSelected.indexOf(
                                        item.id
                                      ) !== -1
                                    }
                                    value={item.id}
                                    onChange={this.handleCheckBoxes}
                                    color="primary"
                                  />
                                }
                                label={item.activity_name}
                              />
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                    <Box mt={2}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={this.handleCancelClickActivity}
                          >
                            CANCEL
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={this.handleSubmitActivities}
                          >
                            SUBMIT
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h3" component="h3">
                My Upcoming Events
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained">EVENTS FOR ME</Button>
            </Grid>

            {/* dummy code for presentation!! to be replaced by GET route of postings user has signed up for */}
            <Grid item lg={12}>
              {/* use avatar to display the number in top left corner */}
              <Box mt={2}>
                <Card>
                  <CardActionArea onClick={this.handlePostingClick}>
                    <CardHeader
                      avatar={<Avatar>1</Avatar>} // adding 1 to postingId because array index starts at 0!
                      title={
                        <Typography variant="h3" component="h3">
                          Posting Title
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1" component="p">
                        Posting Description
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="body2" component="p">
                        2/14/21
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(VolunteerProfile);
