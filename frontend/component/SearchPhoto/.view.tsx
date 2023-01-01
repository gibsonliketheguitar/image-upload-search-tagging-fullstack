import { default as Search } from "@core/Input"
import Button from "@core/Button";

type T_SearchPhoto = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    reset: () => void
}

export function SearchPhoto(props: T_SearchPhoto) {
    const {
        value,
        onChange,
        reset,
    } = props

    return (
        <>
            <Search
                id="search"
                htmlFor="Input"
                placeholder={"Search for images by title or tags"}
                value={value}
                onChange={onChange}
                sx={'rounded-md'}
            />
            {value.length > 3 && (
                <Button
                    disabled={value.length < 3}
                    variant="default"
                    title="Reset Search"
                    onClick={reset}
                    sx={"mr-2"}
                />
            )}
        </>
    )
}