import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Box, Button, CircularProgress, Snackbar } from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import Clear from '@material-ui/icons/Clear';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import image from "./bg.png";

const axios = require("axios").default

const ColorButton = withStyles(() => ({
  root: {
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 25,
    border: 0,
    color: 'white',
    height: 56,
    padding: '0 32px',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    textTransform: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    letterSpacing: '0.5px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.6s',
    },

    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: '0 15px 35px rgba(102, 126, 234, 0.6)',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',

      '&::before': {
        left: '100%',
      },
    },

    '&:active': {
      transform: 'translateY(-2px) scale(1.01)',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  "@keyframes bounce": {
    "0%, 100%": {
      transform: "translateY(0) rotate(0deg)",
      opacity: 1
    },
    "50%": {
      transform: "translateY(-12px) rotate(5deg)",
      opacity: 0.8
    }
  },

  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" }
  },

  "@keyframes shimmer": {
    "0%": { backgroundPosition: "-200% center" },
    "100%": { backgroundPosition: "200% center" }
  },

  "@keyframes pulse": {
    "0%, 100%": {
      boxShadow: "0 0 0 0 rgba(102, 126, 234, 0.7)",
      transform: "scale(1)"
    },
    "50%": {
      boxShadow: "0 0 0 20px rgba(102, 126, 234, 0)",
      transform: "scale(1.05)"
    }
  },

  root: {
    minHeight: "100vh",
    height: "100%",
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      background: `
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
      `,
      zIndex: 0,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: `
        radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
        radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.3), transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.2), transparent),
        radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.3), transparent)
      `,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 100px',
      animation: '$float 6s ease-in-out infinite',
      zIndex: 0,
    },

    '& > *': {
      position: 'relative',
      zIndex: 1,
    }
  },

  appbar: {
    background: 'transparent',
    backdropFilter: 'none',
    boxShadow: 'none',
    border: 'none',
  },

  toolbar: {
    justifyContent: 'center',
    padding: theme.spacing(3, 0),
    position: 'relative',
  },

  appbarTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '2.8rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f2f5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
    position: 'relative',

    '&::after': {
      content: '"Potato Disease Classification"',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'blur(3px)',
      opacity: 0.7,
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '2.2rem',
    },
  },

  contentGrid: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },

  imageCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(25px)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '32px',
    boxShadow: `
      0 20px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      zIndex: 1,
    },

    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `
        0 30px 60px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3)
      `,
      border: '2px solid rgba(255, 255, 255, 0.3)',
    },
  },

  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
  },

  dropzoneArea: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '3px dashed rgba(255, 255, 255, 0.4)',
    borderRadius: '20px',
    color: '#ffffff',
    padding: theme.spacing(4),
    minHeight: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    transition: 'all 0.3s ease',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
      borderRadius: '17px',
      zIndex: -1,
    },

    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.6)',
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'scale(1.02)',
    },

    '& .MuiDropzoneArea-text': {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '1.3rem',
      fontWeight: '500',
      color: '#ffffff',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },

    '& .MuiSvgIcon-root': {
      color: '#ffffff',
      height: '80px',
      width: '80px',
      animation: '$bounce 3s infinite ease-in-out',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
    }
  },

  imagePreviewContainer: {
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    position: 'relative',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
      zIndex: 1,
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },

    '&:hover::before': {
      opacity: 1,
    },
  },

  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  detailContainer: {
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(15px)',
    padding: theme.spacing(3, 4),
    borderRadius: '20px',
    width: '100%',
    minHeight: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    },
  },

  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0.5, 0),

    '&:last-child': {
      marginBottom: 0,
    },
  },

  resultLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    fontSize: '1.1rem',
    fontFamily: "'Poppins', sans-serif",
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
  },

  resultValue: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '2rem',
    textTransform: 'capitalize',
    fontFamily: "'Poppins', sans-serif",
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },

  confidenceValue: {
    fontWeight: '700',
    fontSize: '2rem',
    fontFamily: "'Poppins', sans-serif",
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    padding: theme.spacing(1, 2),
    border: '2px solid currentColor',
    borderRadius: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    transition: 'all 0.3s ease',

    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 20px currentColor',
    },
  },

  loader: {
    color: '#ffffff !important',
    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',

    '& .MuiCircularProgress-circle': {
      strokeLinecap: 'round',
    },
  },

  loaderText: {
    marginTop: theme.spacing(3),
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '1.1rem',
    fontFamily: "'Poppins', sans-serif",
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    letterSpacing: '0.5px',
  },

  buttonContainer: {
    marginTop: theme.spacing(4),
    animation: '$float 4s ease-in-out infinite',
  },
}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  let confidence = 0;

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview || !image) return;
    let isMounted = true;

    const safeSendFile = async () => {
      setIsloading(true);
      let formData = new FormData();
      formData.append("file", selectedFile);
      try {
        let res = await axios({
          method: "post",
          url: process.env.REACT_APP_API_URL,
          data: formData,
        });
        if (isMounted && res.status === 200) {
          setData(res.data);
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        if (isMounted) setIsloading(false);
      }
    };
    safeSendFile();
    return () => { isMounted = false; };
  }, [preview, image]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      clearData();
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = parseFloat(data.confidence).toFixed(2);
  }

  const getConfidenceColor = () => {
    if (confidence > 85) return '#00ff88'; 
    if (confidence > 60) return '#ffaa00'; 
    return '#ff4757';
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.appbarTitle} variant="h4">
            Potato Disease Classification
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container className={classes.contentGrid}>
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
          <Card className={classes.imageCard}>
            <CardContent className={classes.cardContent}>
              {!image ? (
                <DropzoneArea
                  classes={{ root: classes.dropzoneArea }}
                  acceptedFiles={["image/*"]}
                  dropzoneText={"Drag and drop a leaf image here"}
                  onChange={onSelectFile}
                  Icon={ImageSearchIcon}
                  filesLimit={1}
                  maxFileSize={10000000}
                />
              ) : (
                <>
                  <Box className={classes.imagePreviewContainer}>
                    {preview && <img src={preview} className={classes.previewImage} alt="Potato leaf preview" />}
                  </Box>

                  <Box className={classes.detailContainer}>
                    {isLoading ? (
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <CircularProgress size={60} className={classes.loader} />
                        <Typography variant="body1" className={classes.loaderText}>
                          Analyzing your image...
                        </Typography>
                      </Box>
                    ) : (
                      data && (
                        <>
                          <Box className={classes.resultRow}>
                            <Typography className={classes.resultLabel}>Prediction</Typography>
                            <Typography className={classes.resultValue} data-text={data.class}>
                              {data.class}
                            </Typography>
                          </Box>
                          <Box className={classes.resultRow}>
                            <Typography className={classes.resultLabel}>Confidence</Typography>
                            <Typography
                              className={classes.confidenceValue}
                              style={{ color: getConfidenceColor() }}
                            >
                              {confidence}%
                            </Typography>
                          </Box>
                        </>
                      )
                    )}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>

          {data && (
            <Box className={classes.buttonContainer}>
              <ColorButton
                variant="contained"
                onClick={clearData}
                startIcon={<Clear />}
              >
                Classify Another Image
              </ColorButton>
            </Box>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="✨ Image classified successfully!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: '600',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
          }
        }}
      />
    </Box>
  );
};