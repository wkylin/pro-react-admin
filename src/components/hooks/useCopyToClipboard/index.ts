import { useState } from 'react'

const useCopyToClipboard = () => {
  const [result, setResult] = useState<null | { state: 'success' } | { state: 'error'; message: string }>(null)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setResult({ state: 'success' })
    } catch (e: any) {
      setResult({ state: 'error', message: e.message })
      throw e
    } finally {
      // 👇 Show the result feedback for 2 seconds
      setTimeout(() => {
        setResult(null)
      }, 2000)
    }
  }

  // 👇 We want the result as a tuple
  return [copy, result] as const
}
export default useCopyToClipboard

// export function Example() {
//   const [inputText, setInputText] = useState('');
//   const [copyToClipboard, copyResult] = useCopyToClipboard();

//   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputText(e.target.value);
//   };

//   const handleClickCopy = () => {
//     copyToClipboard(inputText);
//   };

//   return (
//     <div>
//       <input value={inputText} onChange={handleChangeInput} />
//       <button onClick={handleClickCopy}>Copy to clipboard</button>
//       <div>
//         {copyResult?.state === 'success' && 'Copied successfully!'}
//         {copyResult?.state === 'error' && `Error: ${copyResult.message}`}
//       </div>
//     </div>
//   );
// }

// import toast from 'react-hot-toast';

// type Props = React.HTMLAttributes<HTMLButtonElement> & {
//   text: string;
// };

// function CopyToClipboard({ text, children = 'Copy', ...rest }: Props) {
//   const handleClickCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(text);
//       // 👇 Using react-hot-toast to provide feedback
//       toast.success('Copied!');
//     } catch (e) {
//       toast.error(`Error: ${e.message}`);
//       throw e;
//     }
//   };

//   return (
//     <button onClick={handleClickCopy} {...rest}>
//       {children}
//     </button>
//   );
// }

// export function Example() {
//   const [inputText, setInputText] = React.useState('');

//   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputText(e.target.value);
//   };

//   return (
//     <div>
//       {/* 👇 Don't forget to add this */}
//       <Toaster />
//       <input value={inputText} onChange={handleChangeInput} />
//       <CopyToClipboard text={inputText} />
//     </div>
//   );
// }
