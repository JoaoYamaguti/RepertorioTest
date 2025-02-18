import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiTrash2 } from "react-icons/fi";
import Paragraph from "../paragraph";

import "./style.css";

export default function DraftEditor() {
    const paragraphQuantities = 5

    const [draft, setDraft] = useState([""])
    const [paragraph, setParagraph] = useState("")

    const paragraphIndex = useRef(0)
    const textareaTag = useRef<HTMLTextAreaElement>(null)

    function updateParagraph(newParagraph: string, index: number) {
        const newDraft = [...draft]

        newDraft[index] = newParagraph

        setDraft(newDraft)

        setParagraph(newDraft[paragraphIndex.current])
    }

    function addNewParagraph() {
        const newDraft = [...draft, ""]
        console.log(newDraft)

        paragraphIndex.current = newDraft.length - 1

        setDraft(newDraft)

        setParagraph(newDraft[paragraphIndex.current])
        if (textareaTag.current != null) {
            textareaTag.current.focus()
        }
    }

    function changeParagraph(op: string) {
        if (op === "+") {
            if (paragraphIndex.current + 1 >= draft.length) {
                paragraphIndex.current = draft.length - 1
            } else {
                paragraphIndex.current = paragraphIndex.current + 1
            }
        } else if (op === "-") {
            if (paragraphIndex.current - 1 < 0) {
                paragraphIndex.current = 0
            } else {
                paragraphIndex.current = paragraphIndex.current - 1
            }
        }
        setParagraph(draft[paragraphIndex.current])
        if (textareaTag.current != null) {
            textareaTag.current.focus()
        }
    }

    function deleteParagraphContent(index: number) {
        const newDraft = [...draft]

        newDraft[index] = " "

        setDraft(newDraft)
    }

    return (
        <main>
            <section className="draft">
                <div>
                    {
                        draft.map((p, index) => <p key={index}>{p}</p>)
                    }
                </div>
                <button type="button" className="saveDraft">Save Draft</button>
            </section>
            <section className="handleParagraph">
                <form>

                    <Paragraph paragraph={paragraph} index={paragraphIndex.current} updateDraft={updateParagraph} textareaTag={textareaTag} />


                    <nav>
                        <div>
                            <button type="button" className="previousParagraph"
                                onClick={() => changeParagraph("-")}
                                disabled={draft.length == 1 || paragraphIndex.current == 0 ? true : false}
                            >
                                <FiChevronLeft />
                            </button>
                            <button type="button" className="nextParagraph"
                                onClick={() => changeParagraph("+")}
                                disabled={draft.length == 1 || paragraphIndex.current + 1 == draft.length ? true : false}
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                        <button type="button" className="deleteBtn"
                            disabled={draft.length == 1 && true}
                            onClick={() => deleteParagraphContent(paragraphIndex.current)}
                        >
                            < FiTrash2 />
                        </button>
                        <button type="button" className="addNewParagraph"
                            onClick={addNewParagraph}
                            disabled={draft.length == paragraphQuantities ? true : false}
                        >
                            + Paragrafo
                        </button>
                    </nav>
                </form>
            </section>
        </main>
    )
}