import React from 'react'

export default function Alert(props) {
    return (

            props.alert.type && <div>
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top`} role="alert" style={{marginTop:"50px"}}>
                    <strong>{props.alert.type}</strong> {props.alert.msg}
    
                </div>
            </div>
    )
}