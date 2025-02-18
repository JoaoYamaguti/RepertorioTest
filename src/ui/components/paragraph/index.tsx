import './style.css'

interface IParagraphParams {
    paragraph: string
    index: number
    updateDraft: (newParagraph:string, index:number)=>void
    textareaTag: React.RefObject<null>
}

export default function Paragraph(params: IParagraphParams) {
    const { paragraph, index, updateDraft, textareaTag } = params

    return (
        <div id={index.toString()} className="paragraph">
            <textarea name="" value={paragraph} id="textarea" className="paragraph" onInput={(e) => updateDraft(e.target.value, index)} ref={textareaTag}></textarea>
        </div>
    )
}