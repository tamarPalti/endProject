
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UpdatePersonalDetails from './UpdatePersonalDetails';
import BusinessInformationUpdate from './BusinessInformationUpdate';
import AddingBusiness from './AddingBusiness';
import SearchHistory from './SearchHistory';
import ScrollableTabsButtonAuto from './SearchHistory';
import { connect } from "react-redux";
import { ChangeUpdateBuisness, ChangeColorFirstName, ChangeColorLastName } from '../../actions/index'
import { GetCurrentUser } from '../../util';
import { Redirect } from 'react-router-dom';
import Tasks from './Tasks';


const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
        4: <VideoLabelIcon />,
        5: <SettingsIcon />
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {

    active: PropTypes.bool,

    completed: PropTypes.bool,

    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Update Personal Details', 'Business Information Update', 'Adding Business', 'Search History', 'Task'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <UpdatePersonalDetails />;
        case 1:
            return <BusinessInformationUpdate />;
        case 2:
            return <AddingBusiness />;
        case 3:
            return <ScrollableTabsButtonAuto />;
        case 4:
            return <Tasks />;
        default:
            return <UpdatePersonalDetails />;
    }
}



function PrivateArea(props) {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(4);
    const steps = getSteps();


    // const [ifGoToLogin, setifGoToLogin] = useState(false);


    const handleNext = (index) => {
        setActiveStep(index);
    };

    useEffect(() => {
        props.ChangeColorFirstName("");
        props.ChangeColorLastName("");
    }, []);

    return (
        <div className={classes.root} style={{"margin-top": "9%"}}>
            <div></div>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector style={{"top": "29px",
                        "width": "0%",
                        "margin-left": "-8%"}}/>}>
                            
                {steps.map((label, index) => (
                    <Step key={index} onClick={() => handleNext(index)} >
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

        </div>
    );
}




const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness, ChangeColorFirstName, ChangeColorLastName })(PrivateArea);


