import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  homepageContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  homeNavbar: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      marginBottom: 0,
    },
    alignItems: "center",
    marginBottom: theme.spacing(2),
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      gap: theme.spacing(3),
    },
  },
  chatbotTextNavbar: {
    color: "#286e34",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "22px",
    textAlign: "center",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  lgmsPortal: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
  },
  dropdown: {
    position: "relative",
  },
  dropdownBtn: {
    cursor: "pointer",
    backgroundColor: "#f3f4f6",
    color: "black",
    fontSize: "16px",
    border: "none",
    borderBottom: "1px solid black",
    padding: "0 8px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&::after": {
      content: '">"',
      fontSize: "12px",
      display: "inline-block",
      marginLeft: "5px",
      transform: "rotate(90deg)",
    },
  },
  dropdownContent: {
    display: "none",
    position: "absolute",
    backgroundColor: "white",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    "& a": {
      color: "black",
      padding: theme.spacing(1.5, 2),
      textDecoration: "none",
      display: "block",
      "&:hover": {
        backgroundColor: theme.palette.grey[300],
      },
    },
  },
  show: {
    display: "block",
  },
  homeNavText: {
    color: "#030303",
    fontSize: "18px",
    fontFamily: "Montserrat",
    lineHeight: "22px",
    textAlign: "center",
    marginRight: theme.spacing(2.5 / 8),
  },
  heroSection: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#cdf2d0",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
    width: "100%",
  },
  heroContent: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  chatbotPrompt: {
    marginBottom: theme.spacing(2),
    textAlign: "left",
  },
  chatbotLink: {},
  websiteUpdatesIcon: {
    color: "#8a8a8a",
    fill: "#8a8a8a",
    fontSize: "24px",
    width: "24px",
    height: "24px",
    marginRight: theme.spacing(1),
  },
  websiteUpdatesText: {
    color: "#030303",
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(24),
    },
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightLight,
    fontStyle: "italic",
    lineHeight: theme.spacing(2.75),
    [theme.breakpoints.up("md")]: {
      lineHeight: theme.spacing(3.25),
    },
  },
  chatbotText: {
    color: "#030303",
    fontSize: theme.typography.pxToRem(32),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(40),
    },
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: theme.spacing(4.5),
    [theme.breakpoints.up("md")]: {
      lineHeight: theme.spacing(5.5),
    },
  },
  descriptionText: {
    color: "#030303",
    fontSize: theme.typography.pxToRem(16),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(18),
    },
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightLight,
    lineHeight: theme.spacing(2.25),
    [theme.breakpoints.up("md")]: {
      lineHeight: theme.spacing(2.5),
    },
  },
  schoolLogoContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "start",
    },
    alignItems: "center",
  },
  schoolLogo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "end",
    },
    justifyContent: "center",
  },
  schoolLogoImage: {
    width: "150px",
    height: "150px",
    [theme.breakpoints.up("md")]: {
      width: "200px",
      height: "200px",
    },
    borderRadius: theme.shape.borderRadius,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  schoolLogoText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    fontSize: "3rem",
  },
  learning: {
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  garden: {
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  montessori: {
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  school: {
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  commonText: {
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  boldText: {
    //previously b.learning in tailwind css
    display: "inline",
    color: "#393939",
    fontSize: "32px",
    fontWeight: 300,
    lineHeight: "42px",
  },
  imageCarouselContainer: {
    margin: "0 auto",
    overflow: "hidden",
  },
  imageSlide: {
    width: "100%",
    height: "671px",
    borderRadius: theme.shape.borderRadiusLarge, // Ensure borderRadiusLarge is defined in your theme
    position: "relative",
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.down("sm")]: {
      // Material-UI uses a mobile-first approach
      height: "auto",
    },
  },
  imageSlideImg: {
    width: "100%",
    height: "671px",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadiusLarge,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  slickDotsLiButtonBefore: {
    color: "#78909c !important", // Important might not work as expected; additional styles or overrides may be needed
  },
  slickDotsLiSlickActiveButtonBefore: {
    color: "#66bb6a !important", // Same note on `!important` usage as above
  },
  testimonialCarouselContainer: {
    padding: theme.spacing(5),
    backgroundColor: theme.palette.grey[100],
  },
  testimonialHeading: {
    fontSize: "24px",
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightLight,
    fontStyle: "italic",
    textAlign: "left",
    marginBottom: theme.spacing(5),
  },
  testimonialSlide: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1.5625), // 1.25rem
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  testimonialContent: {
    flexBasis: "70%",
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
      paddingRight: 0,
      marginBottom: theme.spacing(5),
    },
  },
  testimonialText: {
    marginBottom: theme.spacing(2.5),
  },
  testimonialQuote: {
    color: "#030303",
    fontSize: "40px",
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: "44px",
    marginBottom: theme.spacing(1),
  },
  testimonialAuthor: {
    color: "#030303",
    fontSize: "18px",
    fontWeight: theme.typography.fontWeightLight,
    lineHeight: "20px",
  },
  testimonialImageContainer: {
    flexBasis: "30%",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
      justifyContent: "center",
      marginBottom: theme.spacing(5),
      order: -1, // To make it the first
    },
  },
  testimonialImage: {
    width: "210px",
    height: "210px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  testimonialPlaceholder: {
    width: "210px",
    height: "210px",
    backgroundColor: "#fcf",
    borderRadius: "50%",
    objectFit: "cover",
  },
  //for onlines services and announcement section
  onlineServicesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: theme.spacing(1.5625), // Converts 1.25rem to spacing units
  },
  servicesHeader: {
    width: "100%",
    marginBottom: theme.spacing(5),
  },
  servicesTitle: {
    color: "#191b1c",
    fontSize: theme.typography.pxToRem(24),
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightLight,
    fontStyle: "italic",
    lineHeight: theme.spacing(3.25),
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(20),
      lineHeight: theme.spacing(3),
    },
  },
  servicesList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "between",
    width: "100%",
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  serviceItem: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginBottom: theme.spacing(5),
    },
  },
  textHomepage: {
    color: "#191b1c",
    fontSize: theme.typography.pxToRem(40),
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightThin,
    lineHeight: theme.spacing(5.5),
    marginRight: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(32),
      lineHeight: theme.spacing(4.5),
    },
  },
  buttonServices: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "64px",
    height: "64px",
    border: 0,
    borderRadius: "24px",
    backgroundColor: "#cdf2d0",
    outline: "none",
  },
  icon: {
    color: "#030303",
    fill: "#030303",
    width: "34px",
    height: "34px",
    fontSize: "34px",
  },
  horizontalDivider: {
    width: "1280px",
    height: "1px",
    backgroundColor: "#d1d5db",
    borderRadius: "2px",
    marginTop: theme.spacing(2.5),
    margin: "auto",
  },

  // Announcement styles
  announcementSection: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  announcementContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(6),
    maxWidth: "calc(100% - 2rem)",
  },
  announcementHeading: {
    color: "#191b1c",
    fontSize: theme.typography.pxToRem(24),
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightLight,
    fontStyle: "italic",
    lineHeight: theme.spacing(3.25),
    textAlign: "left",
    paddingLeft: theme.spacing(4),
    marginBottom: theme.spacing(8),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      paddingLeft: 0,
      fontSize: theme.typography.pxToRem(20),
    },
  },
  announcementCard: {
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0px 2px 10px rgba(3, 3, 3, 0.1)",
    padding: theme.spacing(4),
    textAlign: "left",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4),
    },
  },
  announcementTitle: {
    color: "#030303",
    fontSize: theme.typography.pxToRem(18),
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: theme.spacing(2.625),
  },
  announcementDate: {
    color: "#030303",
    fontSize: theme.typography.pxToRem(16),
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightNormal,
    lineHeight: theme.spacing(2.375),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  announcementContent: {
    color: "#030303",
    fontSize: theme.typography.pxToRem(16),
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightNormal,
    lineHeight: theme.spacing(2.375),
    marginBottom: theme.spacing(4),
  },
  moreAnnouncementsButton: {
    cursor: "pointer",
    width: "266px",
    height: "46px",
    padding: theme.spacing(0.25, 2),
    border: `1px solid #030303`,
    borderRadius: "24px",
    backgroundColor: "white",
    color: "#030303",
    fontSize: theme.typography.pxToRem(20),
    fontFamily: "Montserrat",
    lineHeight: theme.spacing(3.25),
    outline: "none",
    marginTop: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: theme.spacing(4),
    },
  },
}));

export default useStyles;
