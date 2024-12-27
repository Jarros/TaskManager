import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 1,
        padding: 10,
        color: '000000',
        borderTopWidth:0,
        borderBottomColor:'#cccccc',
        borderBottomWidth:2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#FFFFFF',
    },
    textStyle: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});