import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { IfExist, ErrorInAdd, SignIn } from '../../actions/index';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import './SingUp.scss';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AddUser, SendMail } from '../../util/index'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { purple } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { UpDateUser } from '../../util'
import alex from './img/alex.png';
// import ImageUploading from 'react-images-uploading';
import person from './img/person.png';

const ariaLabel = { 'aria-label': 'description' };

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#e860ff'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#ff716e'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const styleblue = {
  "width": "74em",
  "background-color": "rgb(11, 11, 43)",
  "margin-top": "13.3%",
  "margin-left": "-4%",
  "height": "2em"
}
//alerts

function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

//alerts



function ExpandingDetails(props) {

  const classes = useStyles();

  const [check, setCheck] = useState(false);


  const { register, formState: { errors }, handleSubmit } = useForm();
  const adress = register('adress');

  const onSubmit = data => {

    let currentUserId = localStorage.getItem("currentUserId");
    data.img = selectedImage;
    data.ifMessege = check;
    console.log(data);

    let fd = new FormData();
    fd.append('img', imsState);
    fd.append('ifMessege', data.ifMessege);
    fd.append('adress', data.adress);

    UpDateUser(fd, currentUserId).then((succ) => {

      settypeAlert("success");
      setmasseg("Update Success");
      handleClick();

    }).catch((error) => {

      settypeAlert("error");
      setmasseg(error.response.data)

      handleClick();
    })


  }

  onchange = (e) => {
    console.log(e);
    setCheck(e.target.checked);

  }

  // alerts

  const [open, setOpen] = React.useState(false);

  const [typeAlert, settypeAlert] = React.useState("");
  const [masseg, setmasseg] = React.useState("");


  const [selectedImage, setselectedImage] = useState();

  const styleButton = {
    "background-color": "rgb(11, 11, 43)",
    "border-radius": "0px",
    "width": "30%",
    "margin-left": "36%",
    "margin-top": "3.8%",
    "color": "white",
  }
  const styleItem = {
    "padding": "22px",
    "margin-top": "-15%",
    "margin-left": "35%"
  }
  const styleLable = {
    "width": "93%",
    "height": "30%",
    "margin-top": "62%"
  }
  const styleInputImg = {
    "border-radius": "50%",
    "height": "3em",
    "width": "21%"
  }
  const styleImg = {
    "width": "16em",
    "border-radius": "50%",
    "width": '100%',
    "height": "17em",
    "margin-top": "-105%",
    "z-index": "10"
  }
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };




  // alerts


  const [imsState, setimsState] = useState();
  const [imsStateToShow, setimsStateToShow] = useState();



  //history
  const history = useHistory();
  const changeHistory = (path) => {
    history.push(path);
  }

  useEffect(() => {

    return (props.IfExist(false), props.ErrorInAdd(false))

  }, [])

  return (
    <>

      {/* alerts */}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
      </Snackbar>

      {/* alerts */}

      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} style={{ "margin-top": "140px" }} >



        <Grid container spacing={2} >

          <Grid item xs={12} sm={4} style={styleItem}>

            <label htmlFor="photo-upload" className="custom-file-upload fas" style={styleLable}>
              <input type="file" className="form-control"
                accept="image/png, image/jpeg"
                name="image" onChange={(e) => {

                  if (e.target.files && e.target.files.length > 0) {
                    setimsState(e.target.files[0]);
                    console.log(e.target.files[0]);
                    setimsStateToShow(e.target.value);
                    e.preventDefault();
                    const reader = new FileReader();
                    const file = e.target.files[0];
                    reader.onloadend = () => {
                      setimsStateToShow(reader.result);
                    }
                    reader.readAsDataURL(file);
                  }

                }}
                style={styleInputImg}
              />

              <img for="photo-upload" style={styleImg} src={imsStateToShow ? imsStateToShow : person} />

            </label>

          </Grid>

          <Grid item xs={12} sm={4} style={{ "padding": "22px", "margin-left": "33%" }}>

            <Input placeholder="Address"
              inputProps={ariaLabel}
              autoComplete="fname"
              name="adress"
              variant="outlined"
              fullWidth
              id="adress"
              autoFocus
              {...adress}
            />

            <ErrorMessage errors={errors} name="address" render={({ message }) => <p className="redColor">{message}</p>} />

          </Grid>


          <Grid item xs={12} style={{ "margin-left": "33%" }}>

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" onChange={(e) => onchange(e)} />}
              label="קבלת הודעות למייל כאשר מישו חיפש אותי"
            />

          </Grid>

        </Grid>




        <ColorButton
          variant="contained"
          color="primary"
          style={styleButton}
          className={classes.margin + " " + classes.submit}
          type="submit"
          fullWidth

        >

          Save

        </ColorButton>

        <Grid container justifyContent="flex-end">

          <Grid item>

            <Link to="/SignIn">

              Already have an account? Sign in

              </Link>

          </Grid>

        </Grid>
        <div style={styleblue}> </div>

      </form>

    </>

  );
}
const mapStateToProps = (state) => {

  return { ifExist: state.usersPart.IfExist, errorInAdd: state.usersPart.ErrorInAdd };
}
export default connect(mapStateToProps, { IfExist, ErrorInAdd, SignIn })(ExpandingDetails);