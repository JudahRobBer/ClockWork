import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
      },
    container: {
        justifyContent: "center",
        height: 110,
        flexDirection: 'row', // This makes the children elements align horizontally
        alignItems: 'center', // This centers the children vertically
        marginHorizontal:20,
        
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginRight: 10,
        marginLeft: 10,
        
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        alignself: 'center',
        borderWidth: 1, // Add a border to the box (you can customize border styles)
        padding: 10, // Add padding around the content inside the box
        borderRadius: 10, // Add rounded corners to the box
        justifyContent: "center"

    },
    img: {
        height: 50,
        width: 50,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
    },
    inputRow: {
        flexDirection: 'row', 
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'center',
        
    },
    scheduleText: {
        fontSize: 40,
        textAlign: 'left',
        marginTop: 60,
        marginBottom: 30,
    },

    rowSpacing: {
        marginLeft: 10,
    },
    
    containerCom: {
        height: 90, 
        backgroundColor: 'white',
        alignItems: 'center', 
        alignContent: 'center',
        marginBottom: 30,
        marginHorizontal:20,
    },
    button: {
        marginTop:20,
        padding: 12,
        marginBottom: 12,
        borderRadius: 6,
      },
    
      buttonText: {
        fontSize:20,
        textAlign:'center',
        fontFamily:'Apple SD Gothic Neo',
        color: '#fbfcde',
    },

    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
    
    tableCell: {
        flex: 1,
        textAlign: 'center',
      },
    PTbox:{
        justifyContent: "center",
        height: 'auto',
        width: 'auto',
        flexDirection: 'row', 
        alignItems: 'center', 
        margin: 15,
        
    },
    container2: {
        justifyContent: "center",
        height: 100,
        flexDirection: 'row', 
        alignItems: 'center', 
        margin: 0,  
    },
    container3:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

} );