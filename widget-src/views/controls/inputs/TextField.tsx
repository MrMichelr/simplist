const { widget } = figma
const { AutoLayout } = widget

// Imports
import { ColorPalette } from "../../../constants"
import { IconName } from "../../../models/IconLibrary"
import { DefaultTextField } from "./DefaultTextField"
import { OnlyTextField } from "./OnlyTextField"
import { PlaceholderTextField } from "./PlaceholderTextField"

type Props = {
    type: 'default' | 'placeholder' | 'only'

    // Styling
    color?: ColorPalette
    placeholder?: string

    onClick?: ((event: WidgetClickEvent) => void | Promise<any>)

    onAddTask?: (taskContent: string) => void

    onTextEditEnd?: (e: any) => void
}
export function TextField(props: Props) {

    switch (props.type) {
        case 'default':
            return (
                <DefaultTextField color={props.color} onAddTask={props.onAddTask!} />
            )
        case 'placeholder':
            return (
                <PlaceholderTextField color={props.color} />
            )
        case 'only':
            return (
                <OnlyTextField color={props.color} placeholder={props.placeholder} onTextEditEnd={props.onTextEditEnd} />
            )
    }
}