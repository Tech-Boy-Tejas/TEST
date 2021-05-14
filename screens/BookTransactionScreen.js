import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }

    getCameraPermissions = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission:status === "granted",
            buttonState:'clicked',
            scanned:'false'
        })
    }

    handleBarCodeScanned = async({type,data}) => {
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
        });
        console.log(this.state);
    }

    render(){
        const hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermission){
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                    style = {StyleSheet.absoluteFillObject}/>

                
            )
        }
        else if(buttonState === "normal"){
            return(
                <View style = {styles.container}>
                    <Text style = {styles.displayText}>
                        {hasCameraPermission === true ? this.state.scannedData : 'REQUEST CAMERA PERMISSION'}
                    </Text>
                    <TouchableOpacity style = {styles.scanButton}
                        onPress = {this.getCameraPermissions}>
                        <Text style = {styles.buttonText}>SCAN QR CODE</Text> 
                    </TouchableOpacity>
                </View>
            )
        }
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',

    },
    scanButton:{
        backgroundColor:'yellow',
        padding:10,
        margin:10,
    },
    buttonText:{
        fontSize:20,
    }

})