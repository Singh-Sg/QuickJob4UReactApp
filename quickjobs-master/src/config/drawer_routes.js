import { AsyncStorage } from 'react-native'

export const drawer_routes = (callback) => {
    AsyncStorage.getItem('user', (err, result) => {
        if(result === null){
            callback([
                {
                    title: 'Sign In'
                },
                {
                    title: 'Customer Sign up'
                },
                {
                    title: 'Service Professional Sign up'
                }
            ])
        }
    })
    callback([])
}