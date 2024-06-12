const { widget } = figma
const {AutoLayout, Text} = widget

// Import
import { ColorPalette, Font, Spacing } from "../../constants";
import { TextLibrary } from "../../models/TextLibrary";

// Views
import { Window } from "../../views/containers/Window";
import { TextField } from "../../views/controls/inputs/TextField";
import { Header } from "../../views/header/HeaderBase";


type Props = {
    color: ColorPalette

    onMenu?: ((event: WidgetClickEvent) => void | Promise<any>)
}

export function FilledPage (props: Props) {
    return (
        <Window fill={props.color.background.primary} stroke={props.color.neutrals.lowest}>
            <Header title='Todo' color={props.color} onClick={props.onMenu}/>

            <AutoLayout
                name='Content'
                direction='vertical'
                spacing={Spacing.xxl}
                width='fill-parent'
                horizontalAlignItems='center'
            >
                <TextField color={props.color} type='default' />
                <AutoLayout
                    name='List'
                    spacing={Spacing.s}
                    width='fill-parent'
                    direction='vertical'
                    verticalAlignItems='center'
                >
                    
                </AutoLayout>
            </AutoLayout>
        </Window>
    )
}