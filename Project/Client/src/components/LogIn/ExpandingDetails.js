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
  "background-color": "#0b0b2b ",
  "margin-top": "6.7%",
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
    data.ifMessege=check;
    console.log(data);

    UpDateUser(data, currentUserId).then((succ) => {

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
    "background-color": "#0b0b2b", "border-radius": "0px 0px 0px 0px", "width": "20%",
    "margin-left": "57%",
    "margin-top": " -7.2%",
    'color': 'white'
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


  const onFileChange = (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.onload = (event) => {
      setselectedImage(event.target.result)

    }
  }

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

      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} style={{ "margin-top": "31px" }} >


        {/* העלאת תמונה */}

        <input type="file" className="form-control" name="image" onChange={onFileChange} />

        <Grid container spacing={2} >

          <Grid item xs={12} sm={4} style={{ "padding": "22px" }}>

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


          <Grid item xs={12}>

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