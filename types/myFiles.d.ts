/**
 * Interface describing the metadata of a file.
 */
interface FileMetadata {
  /** Unique identifier for the file. */
  file_id: string;

  /** URL of the source. Can be empty if not applicable. */
  source_url: string;

  /** Direct URL to the file. */
  file_url: string;

  /** Key or hash value associated with the file. */
  key: string;

  /** Title or name of the file. */
  title: string;

  /** Identifier of the topic associated with the file. */
  topic_id: string;

  /** Primary comment or description about the file. */
  comment: string;

  /** Secondary comment or additional description about the file. */
  comment2: string;

  /** Full name of the file including extension. */
  name: string;

  /** Package name for the Android application. */
  package_name: string;

  /** Size of the file, typically including units like MB (e.g., "19.5 MB"). */
  size: string;

  /** MIME type of the file. */
  mimetype: string;

  /** Type or category identifier of the file. */
  type: string;

  /** x-coordinate for UI placement or other purposes (usage context unknown). */
  sx: string;

  /** y-coordinate for UI placement or other purposes (usage context unknown). */
  sy: string;

  /** Counter value (could represent downloads, views, or other metrics). */
  count: number;

  /** High-definition indicator or related usage (context unknown). */
  hd: string;

  /** Indicates if this is the main file (usage context unknown). */
  main_file: string;

  /** Username of the uploader. */
  login: string;

  /** External cache information (usage context unknown). */
  ext_caches: string;

  /** Unix timestamp when the file was posted. */
  posted: string;

  /** Minimum Android version required, often formatted as HTML. */
  min_android: string;

  /** Minimum SDK version required. */
  min_sdk: string;

  /** CPU architecture required for the file (e.g., ARMv7). */
  arch: string;

  /** Flag indicating if the file is damaged. */
  damaged: string;

  /** Display type or mode (usage context unknown). */
  display_type: string;

  /** Indicates the danger level of the file (0 usually means no danger). */
  danger: number;

  /** Confirmation of danger status (usage context unknown). */
  danger_confirm: string;

  /** Flag indicating if the file is not ready for some operation. */
  not_ready: string;

  /** Indicates if root access is required to use the file. */
  root: string;

  /** Indicates if the file has a Russian locale. */
  locale_ru: string;

  /** Number of permissions the file requires. */
  perm_count: string;

  /** Caption indicating if viruses were found. */
  virus_caption: string;

  /** Additional virus-related caption. */
  virus_caption2: string;

  /** Classification of virus status (e.g., "green" means safe). */
  virus_class: string;

  /** Data split information (usage context unknown). */
  d_split: string;

  /** Data moderation status (usage context unknown). */
  d_moderate: string;

  /** Caption indicating the status of the digital certificate. */
  cert_caption: string;

  /** Classification of the certificate status. */
  cert_class: string;

  /** Additional caption for the certificate status. */
  cert_caption2: string;

  /** Caption indicating if the file has been checked. */
  check_caption: string;

  /** Classification of the check status. */
  check_class: string;

  /** Indicates if the file is currently being processed (0 or 1). */
  processing: number;

  /** Flag indicating if the file is marked for deletion (0 or 1). */
  for_delete: number;

  /** Flag indicating if this is an update to an existing file (0 or 1). */
  is_update: number;

  /** Flag indicating if this is a new file (0 or 1). */
  new_file: number;
}

/**
 * Collection of file metadata objects indexed by a unique key.
 */
export interface FileCollection extends Array {
  [key: string]: FileMetadata;
}