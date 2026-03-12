import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Button, Snackbar } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Clear from "@material-ui/icons/Clear";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(14px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "@keyframes shimmer": {
    "0%": { backgroundPosition: "-600px 0" },
    "100%": { backgroundPosition: "600px 0" },
  },
  "@keyframes floatY": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-7px)" },
  },
  "@keyframes pulse": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.4 },
  },
  "@keyframes barFill": {
    from: { transform: "scaleX(0)" },
    to: { transform: "scaleX(1)" },
  },

  /* ── Root ─────────────────────────────────────────── */
  root: {
    minHeight: "100vh",
    backgroundColor: "#050508",
    backgroundImage: [
      "radial-gradient(ellipse 75% 45% at 50% 0%, rgba(124,58,237,0.18), transparent)",
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
      "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    ].join(", "),
    backgroundSize: "100% 100%, 48px 48px, 48px 48px",
    display: "flex",
    flexDirection: "column",
  },

  /* ── Header ───────────────────────────────────────── */
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.055)",
    [theme.breakpoints.down("xs")]: { padding: "16px 20px" },
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logoMark: {
    width: 30,
    height: 30,
    borderRadius: 8,
    background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "0.925rem",
    color: "#f1f5f9",
    letterSpacing: "-0.02em",
  },
  headerTag: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.68rem",
    fontWeight: 500,
    color: "#475569",
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.03)",
    padding: "4px 12px",
    borderRadius: 100,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    [theme.breakpoints.down("xs")]: { display: "none" },
  },

  /* ── Main ─────────────────────────────────────────── */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 20px 64px",
  },
  heroBlock: {
    textAlign: "center",
    marginBottom: 40,
    animation: "$fadeInUp 0.55s ease both",
  },
  heroHeading: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
    color: "#f1f5f9",
    letterSpacing: "-0.04em",
    lineHeight: 1.12,
    marginBottom: 14,
  },
  heroAccent: {
    background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: "0.9rem",
    color: "#64748b",
    lineHeight: 1.7,
    maxWidth: 360,
    margin: "0 auto",
  },

  /* ── Card ─────────────────────────────────────────── */
  card: {
    width: "100%",
    maxWidth: 480,
    background: "rgba(255,255,255,0.028)",
    backdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
    animation: "$fadeInUp 0.55s 0.08s ease both",
    transition: "border-color 0.3s ease",
    "&:hover": {
      borderColor: "rgba(124,58,237,0.22)",
    },
  },
  cardBody: {
    padding: 32,
    [theme.breakpoints.up("sm")]: { padding: 40 },
  },

  /* ── Upload state ─────────────────────────────────── */
  sectionLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.68rem",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 14,
    display: "block",
  },
  uploadIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: "rgba(124,58,237,0.12)",
    border: "1px solid rgba(124,58,237,0.28)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    animation: "$floatY 3.5s ease-in-out infinite",
    "& svg": { color: "#a78bfa", fontSize: 24 },
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 22,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#10b981",
    animation: "$pulse 2s ease-in-out infinite",
  },
  statusText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 500,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },

  /* ── Image preview ────────────────────────────────── */
  imageWrap: {
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
    marginBottom: 20,
    background: "#0c0c14",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform 0.6s ease",
      "&:hover": { transform: "scale(1.04)" },
    },
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(5,5,8,0.65) 0%, transparent 55%)",
    pointerEvents: "none",
    zIndex: 1,
  },

  /* ── Skeleton loader ──────────────────────────────── */
  skeletonWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    animation: "$fadeInUp 0.3s ease both",
  },
  skeletonBar: {
    height: 11,
    borderRadius: 6,
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)",
    backgroundSize: "600px 100%",
    animation: "$shimmer 1.6s infinite linear",
  },

  /* ── Results bento ────────────────────────────────── */
  resultGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    [theme.breakpoints.down("xs")]: { gridTemplateColumns: "1fr" },
  },
  resultPanel: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: 18,
  },
  panelLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.65rem",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    display: "block",
    marginBottom: 10,
  },
  diagnosisText: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#f1f5f9",
    lineHeight: 1.3,
    marginBottom: 8,
  },
  diseaseChip: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 100,
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.65rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  confidenceNum: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 800,
    fontSize: "2rem",
    lineHeight: 1,
    letterSpacing: "-0.04em",
    marginBottom: 14,
  },
  progressTrack: {
    height: 5,
    borderRadius: 100,
    background: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 100,
    transformOrigin: "left center",
    animation: "$barFill 1.1s cubic-bezier(0.4, 0, 0.2, 1) both",
    transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  /* ── Clear button ─────────────────────────────────── */
  clearBtn: {
    marginTop: 20,
    width: "100%",
    height: 46,
    borderRadius: 11,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#94a3b8",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: "0.85rem",
    textTransform: "none",
    letterSpacing: 0,
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(124,58,237,0.1)",
      borderColor: "rgba(124,58,237,0.35)",
      color: "#c4b5fd",
    },
  },

  /* ── Footer ───────────────────────────────────────── */
  footer: {
    textAlign: "center",
    padding: "18px 20px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
  },
  footerText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.7rem",
    color: "#1e293b",
    letterSpacing: "0.04em",
  },
}));

/* ── Component ────────────────────────────────────────── */
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
    if (!selectedFile) { setPreview(undefined); return; }
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
        let res = await axios({ method: "post", url: process.env.REACT_APP_API_URL, data: formData });
        if (isMounted && res.status === 200) { setData(res.data); setSnackbarOpen(true); }
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
    if (!files || files.length === 0) { clearData(); return; }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = parseFloat(data.confidence).toFixed(2);
  }

  const getConfidenceColor = () => {
    if (confidence > 85) return "#10b981";
    if (confidence > 60) return "#f59e0b";
    return "#ef4444";
  };

  const getDiseaseChipStyle = () => {
    if (!data) return {};
    if (data.class === "Healthy")
      return { background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" };
    return { background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.22)" };
  };

  return (
    <Box className={classes.root}>

      {/* ── Header ── */}
      <Box component="header" className={classes.header}>
        <Box className={classes.logoRow}>
          <Box className={classes.logoMark} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C7 1 2 4.5 2 8.5C2 11.54 4.24 14 7 14C9.76 14 12 11.54 12 8.5C12 4.5 7 1 7 1Z" fill="white" fillOpacity="0.92" />
              <path d="M7 4V13" stroke="rgba(60,20,100,0.6)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </Box>
          <Typography className={classes.logoText}>AgriScan AI</Typography>
        </Box>
        <Typography component="span" className={classes.headerTag}>
          Potato Module · v1.0
        </Typography>
      </Box>

      {/* ── Main ── */}
      <Box component="main" className={classes.main}>

        {/* Hero */}
        <Box className={classes.heroBlock}>
          <Typography variant="h1" className={classes.heroHeading}>
            Detect Disease,<br />
            <span className={classes.heroAccent}>Protect Crops.</span>
          </Typography>
          <Typography className={classes.heroSub}>
            Upload a potato leaf photo for an instant AI-powered diagnosis with confidence scoring.
          </Typography>
        </Box>

        {/* Card */}
        <Box className={classes.card} role="region" aria-label="Disease classification tool">
          <Box className={classes.cardBody}>

            {!image ? (
              /* ── Upload state ── */
              <>
                <Typography component="span" className={classes.sectionLabel}>
                  Leaf Image Upload
                </Typography>
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  dropzoneText={"Drag & drop a leaf image, or click to browse"}
                  onChange={onSelectFile}
                  Icon={ImageSearchIcon}
                  filesLimit={1}
                  maxFileSize={10000000}
                  showAlerts={false}
                  showPreviews={false}
                  showPreviewsInDropzone={false}
                />
                <Box className={classes.statusRow}>
                  <Box className={classes.statusDot} aria-hidden="true" />
                  <Typography component="span" className={classes.statusText}>
                    Model ready · 3 classes
                  </Typography>
                </Box>
              </>
            ) : (
              /* ── Image + Results state ── */
              <>
                {/* Image preview */}
                <Box className={classes.imageWrap}>
                  {preview && <img src={preview} alt="Uploaded potato leaf for analysis" />}
                  <Box className={classes.imageOverlay} aria-hidden="true" />
                </Box>

                {/* Skeleton or Results */}
                {isLoading ? (
                  <Box className={classes.skeletonWrap} aria-label="Analysing image…" role="status">
                    <Box className={classes.skeletonBar} style={{ width: "55%" }} />
                    <Box className={classes.skeletonBar} style={{ width: "80%" }} />
                    <Box className={classes.skeletonBar} style={{ width: "65%" }} />
                    <Box className={classes.skeletonBar} style={{ width: "42%" }} />
                  </Box>
                ) : (
                  data && (
                    <Box className={classes.resultGrid} role="region" aria-label="Classification results">
                      {/* Diagnosis panel */}
                      <Box className={classes.resultPanel}>
                        <Typography component="span" className={classes.panelLabel}>Diagnosis</Typography>
                        <Typography className={classes.diagnosisText}>{data.class}</Typography>
                        <Box
                          component="span"
                          className={classes.diseaseChip}
                          style={getDiseaseChipStyle()}
                        >
                          {data.class === "Healthy" ? "No disease" : "Disease detected"}
                        </Box>
                      </Box>

                      {/* Confidence panel */}
                      <Box className={classes.resultPanel}>
                        <Typography component="span" className={classes.panelLabel}>Confidence</Typography>
                        <Typography
                          className={classes.confidenceNum}
                          style={{ color: getConfidenceColor() }}
                          aria-label={`Confidence: ${confidence} percent`}
                        >
                          {confidence}%
                        </Typography>
                        <Box className={classes.progressTrack} role="progressbar" aria-valuenow={confidence} aria-valuemin={0} aria-valuemax={100}>
                          <Box
                            className={classes.progressFill}
                            style={{ width: `${confidence}%`, background: getConfidenceColor() }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )
                )}

                {/* Reset button */}
                {data && (
                  <Button
                    className={classes.clearBtn}
                    onClick={clearData}
                    startIcon={<Clear />}
                    disableElevation
                    disableRipple={false}
                    aria-label="Clear results and classify another image"
                  >
                    Analyse Another Image
                  </Button>
                )}
              </>
            )}

          </Box>
        </Box>
      </Box>

      {/* ── Footer ── */}
      <Box component="footer" className={classes.footer}>
        <Typography component="p" className={classes.footerText}>
          Powered by TensorFlow &middot; PlantVillage Dataset &middot; Dev Mistry
        </Typography>
      </Box>

      {/* ── Snackbar ── */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="Analysis complete"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          style: {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "0.85rem",
            background: "rgba(10,10,18,0.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(124,58,237,0.35)",
            color: "#e2e8f0",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          },
        }}
      />

    </Box>
  );
};