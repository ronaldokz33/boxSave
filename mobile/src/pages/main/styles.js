import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    logo: {
        alignSelf: 'center'
    },
    button: {
        height: 48,
        borderRadius: 4,
        paddingHorizontal: 20,
        marginTop: 10,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    }
});

export default styles;
