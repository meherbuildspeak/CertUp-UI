import React, { useRef, useState } from 'react'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'

export default function FileUploadZone({ files = [], onFilesChange }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const maxSizeBytes = 50 * 1024 * 1024 // 50MB

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const processFiles = (newFiles) => {
    setErrorMessage('')
    const validFiles = []

    Array.from(newFiles).forEach((file) => {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMessage(`File "${file.name}" is not a PDF. Only PDF files are accepted.`)
        return
      }
      if (file.size > maxSizeBytes) {
        setErrorMessage(`File "${file.name}" exceeds the 50MB limit.`)
        return
      }
      validFiles.push(file)
    })

    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles])
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
    }
  }

  const removeFile = (indexToRemove) => {
    const updated = files.filter((_, idx) => idx !== indexToRemove)
    onFilesChange(updated)
  }

  return (
    <div className="w-full space-y-4">
      {/* Drop Zone Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center transition duration-200 cursor-pointer group ${
          isDragging
            ? 'border-accent bg-accent/10'
            : 'border-border/80 hover:border-accent/50 bg-background/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="p-3 rounded-full bg-accent/10 mb-3 group-hover:bg-accent/20 transition">
          <Upload className="w-6 h-6 text-accent" />
        </div>

        <p className="text-white font-medium text-sm mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-muted text-xs">
          PDF documents only (Max 50MB per file)
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selected File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">
            Uploaded Policy Documents ({files.length})
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-border/80 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-white font-medium truncate">{file.name}</span>
                  <span className="text-muted text-[10px]">
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(idx)
                  }}
                  className="text-muted hover:text-rose-400 p-1 rounded transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
