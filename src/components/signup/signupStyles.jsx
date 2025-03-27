const signupStyles = {
    paper: {
        width: "fit-content",
        padding: "25px",
        borderRadius: "20px",
        display: "grid",
        gap:'20px',
        "&>*":{
            width:'350px',
            varient:'Standard',
        }
    },
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    signupBtn:{
        fontWeight:'500',
        width:'50%',
        height:'55px',
        fontSize:'20px',
        justifySelf:'center',
    },
    hero:{
        textAlign:'center',
    }
}

export default signupStyles;