"use client"

import { useState } from "react"
import CreatableSelect from "react-select/creatable"
import { components, SingleValue, type OptionProps, type SingleValueProps } from "react-select"



type OptionType = {
  value: string
  label: string
  title: string
  description: string
  type: "main" | "additional",
  __isNew__?: boolean
}

const CustomOption = (props: OptionProps<OptionType>) => {
  const { data } = props

  const typeColors = {
    main: "bg-emerald-100 text-emerald-800",
    additional: "bg-blue-100 text-blue-800",
  }

  return (
    <components.Option {...props}>
      <div className="py-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{data.label}</span>
          {data.__isNew__ ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">Baru</span>
          ) : (
            <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[data.type]}`}>{data.type === "main" ? "Utama" : "Tambahan"}</span>
          )}
        </div>
        {data.description && <div className="text-xs text-gray-500 mt-1">{data.description}</div>}
      </div>
    </components.Option>
  )
}

const CustomSingleValue = (props: SingleValueProps<OptionType>) => {
  const { data } = props

  const typeColors = {
    main: "text-emerald-700",
    additional: "text-blue-700",
  }

  return (
    <components.SingleValue {...props}>
      <div className={`font-medium ${data.__isNew__ ? "text-gray-700" : typeColors[data.type]}`}>
        {data.label}
        {data.__isNew__ && <span className="ml-2 text-xs text-gray-500">(custom)</span>}
      </div>
    </components.SingleValue>
  )
}

interface CreatableCustomSelectProps {
  options: OptionType[]
  onChange: (value?: string) => void
  onCreate: (value: string) => void
  placeholder: string
  isDisabled?: boolean
  value?: OptionType | null
}

export default function CreatableCustomSelect({
  options,
  onChange,
  onCreate,
  placeholder,
  isDisabled = false,
  value,
}: CreatableCustomSelectProps
) {
  const onSelect = (options: SingleValue<OptionType>) => {
    if (options?.value) {
      onChange(options.value)
    }
  }
  return (
    <CreatableSelect
      options={options}
      value={value}
      onChange={(option) => onSelect(option as SingleValue<OptionType>)}
      onCreateOption={onCreate}
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
      }}
      isDisabled={isDisabled}
      formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: "0.375rem",
          borderColor: "#e2e8f0",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#cbd5e1",
          },
        }),
        menu: (base) => ({
          ...base,
          borderRadius: "0.375rem",
          overflow: "hidden",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }),
      }}
      className="text-sm"
      placeholder={placeholder}
    />

  )
}
