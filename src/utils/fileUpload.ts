/**
 * File upload utility for text extraction
 * Handles reading text from various file formats
 */

export interface FileUploadResult {
  success: boolean;
  text: string;
  error?: string;
  fileName?: string;
  fileSize?: number;
}

const MAX_FILE_SIZE = 50 * 1024; // 50KB in bytes
const ALLOWED_TYPES = [
  'text/plain',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

/**
 * Read text from a file
 */
export const readFileAsText = async (file: File): Promise<FileUploadResult> => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      text: '',
      error: `File size exceeds limit of ${MAX_FILE_SIZE / 1024}KB`,
      fileName: file.name,
      fileSize: file.size
    };
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      text: '',
      error: 'Unsupported file type. Please upload .txt, .pdf, or .docx files.',
      fileName: file.name,
      fileSize: file.size
    };
  }

  try {
    const text = await extractTextFromFile(file);
    return {
      success: true,
      text,
      fileName: file.name,
      fileSize: file.size
    };
  } catch (error) {
    return {
      success: false,
      text: '',
      error: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      fileName: file.name,
      fileSize: file.size
    };
  }
};

/**
 * Extract text from different file types
 */
const extractTextFromFile = async (file: File): Promise<string> => {
  const fileType = file.type;

  if (fileType === 'text/plain') {
    return await readTextFile(file);
  } else if (fileType === 'application/pdf') {
    return await readPdfFile(file);
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await readDocxFile(file);
  } else {
    throw new Error('Unsupported file type');
  }
};

/**
 * Read plain text file
 */
const readTextFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
};

/**
 * Read PDF file (simple text extraction)
 * Note: This is a basic implementation. For production, consider using a proper PDF library
 */
const readPdfFile = async (file: File): Promise<string> => {
  // For now, we'll return a placeholder message
  // In a real implementation, you'd use a PDF parsing library like pdf-parse
  return `[PDF file: ${file.name}]\n\nNote: PDF text extraction is not implemented in this simplified version. Please convert to .txt format for full functionality.`;
};

/**
 * Read DOCX file (simple text extraction)
 * Note: This is a basic implementation. For production, consider using a proper DOCX library
 */
const readDocxFile = async (file: File): Promise<string> => {
  // For now, we'll return a placeholder message
  // In a real implementation, you'd use a DOCX parsing library like mammoth
  return `[DOCX file: ${file.name}]\n\nNote: DOCX text extraction is not implemented in this simplified version. Please convert to .txt format for full functionality.`;
};

/**
 * Create a file input element and trigger file selection
 */
export const triggerFileUpload = (): Promise<File | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.pdf,.docx';
    input.multiple = false;
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      resolve(file);
    };
    
    input.click();
  });
};
