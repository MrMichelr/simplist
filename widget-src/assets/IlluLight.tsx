const { widget } = figma
const {SVG} = widget

type Props = {
    width?: WidgetJSX.Size
    height?: WidgetJSX.Size
    accent?: string
}

export function IlluLight (props: Props) {

    return (
        <SVG
            width={props.width || 150}
            height={props.height || 150}
            src={`
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H76C77.933 0.5 79.5 2.067 79.5 4V56C79.5 57.933 77.933 59.5 76 59.5H4C2.067 59.5 0.5 57.933 0.5 56V4Z" 
                fill="white"/>
                <path d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H76C77.933 0.5 79.5 2.067 79.5 4V56C79.5 57.933 77.933 59.5 76 59.5H4C2.067 59.5 0.5 57.933 0.5 56V4Z" 
                stroke="#EFEFEF"/>
                <rect x="7" y="9" width="52" height="12" rx="2" 
                fill="#EFEFEF"/>
                <rect x="61" y="9" width="12" height="12" rx="2" 
                fill="${props.accent}"/>
                <rect x="7.5" y="25.5" width="7" height="7" rx="0.5" 
                stroke="${props.accent}"/>
                <rect x="15.5" y="35.5" width="7" height="7" rx="0.5" 
                stroke="${props.accent}"/>
                <rect x="7.5" y="45.5" width="7" height="7" rx="0.5" 
                fill="#DEDEDE" stroke="#CCCCCC"/>
                <rect x="19" y="28" width="44" height="2" rx="1" 
                fill="#161616"/>
                <rect x="27" y="38" width="31" height="2" rx="1" 
                fill="#161616"/>
                <rect x="19" y="48" width="43" height="2" rx="1"
                fill="#8A8A8A"/>
                <path d="M11 34V39H14" 
                stroke="#DEDEDE"/>
            </svg>

            `}
        />
    )
}