export interface IGetTimeProps {
    time: string;
}

export function UserForm(props:IGetTimeProps) {
    return(
        <p>UserForm works! { props.time }</p>
    )
}