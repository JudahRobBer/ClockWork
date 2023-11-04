import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    img: {
        height: 220,
        width: 220,
        position: 'relative',
        bottom: 100,
        left: 80,
    },
    content: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    }, 
    label: {
        fontSize: 18,
        marginBottom: 5,
    }






});