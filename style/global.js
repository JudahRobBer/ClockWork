import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
      },
    container: {
        marginLeft: 80,
        height: 120,
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
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1, // Add a border to the box (you can customize border styles)
        padding: 10, // Add padding around the content inside the box
        borderRadius: 10, // Add rounded corners to the box
    },
    img: {
        height: 50,
        width: 50,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
});