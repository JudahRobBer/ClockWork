import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
      },
    container: {
        justifyContent: "center",
        height: 120,
        borderWidth: 1,
        flexDirection: 'row', // This makes the children elements align horizontally
        alignItems: 'center', // This centers the children vertically
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 60,
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
        fontSize: 20,
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

    rowSpacing: {
        marginLeft: 10,
    },
    
    containerCom: {
        height: 90, 
        backgroundColor: 'white',
        alignItems: 'center', // This centers the children vertically
        alignContent: 'center',
        marginBottom: 5,
    }



} );