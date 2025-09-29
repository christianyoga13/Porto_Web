"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        onChange(data.url)
      } else {
        const error = await response.json()
        alert(`Upload failed: ${error.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    }
  }

  const handleRemove = () => {
    onChange("")
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Project Image
      </label>
      
      {/* Current Image Preview */}
      {value && (
        <div className="relative w-full h-48 bg-slate-800/50 rounded-lg overflow-hidden border border-slate-600">
          <Image
            src={value}
            alt="Project preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
            disabled={disabled || isUploading}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      {!value && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${dragActive 
              ? 'border-cyan-500 bg-cyan-500/10' 
              : 'border-slate-600 hover:border-slate-500'
            }
            ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
            className="hidden"
          />
          
          <div className="flex flex-col items-center space-y-3">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            ) : (
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                {dragActive ? (
                  <Upload className="w-6 h-6 text-cyan-500" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                )}
              </div>
            )}
            
            <div>
              <p className="text-slate-300 font-medium">
                {isUploading ? 'Uploading...' : 'Upload project image'}
              </p>
              <p className="text-slate-500 text-sm">
                {dragActive 
                  ? 'Drop your image here' 
                  : 'Drag & drop or click to browse (Max 5MB)'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* File Info */}
      <div className="text-xs text-slate-500">
        Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
      </div>
    </div>
  )
}
