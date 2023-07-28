import React, { useEffect } from 'react'
import { CustomFileManagerInterface } from './customFileManager.types'

export const CustomFileManager: React.FC<CustomFileManagerInterface> = (props) => {
  const { onChange, accept } = props
  const tempValue: string | string[] | undefined = []

  useEffect(() => {
    if (tempValue) {
      if (onChange) {
        onChange(tempValue)
      }
    }
  }, [tempValue])

  return (
    // <FileManager
    //   accept={accept}
    //   setValue={(fileId: any) => {
    //     if (onChange) {
    //       onChange(fileId);
    //     }
    //   }}
    //   value={tempValue}
    // />
    <></>
  )
}
