import { toolsClient } from '@/libs/trpc/client';

type CallToolResult = { error?: string; output?: string; success: boolean };
type ExportAndUploadFileResult = { fileType: string; id: string; url: string };

class CloudSandboxService {
  /**
   * Call a cloud sandbox tool
   * @param toolName - The name of the tool to call (e.g., 'runCommand', 'writeLocalFile')
   * @param params - The parameters for the tool
   * @param context - Session context containing topicId and optional userId for isolation
   */
  async callTool(
    toolName: string,
    params: Record<string, any>,
    context: { topicId: string; userId?: string },
  ): Promise<CallToolResult> {
    void toolName;
    void params;
    void context;
    void toolsClient;
    throw new Error('Cloud sandbox market API has been removed');
  }

  /**
   * Export a file from sandbox and upload to S3, then create a persistent file record
   * This is a single call that combines: getUploadUrl + callTool(exportFile) + createFileRecord
   * Returns a permanent /f/:id URL instead of a temporary pre-signed URL
   * @param path - The file path in the sandbox
   * @param filename - The name of the file to export
   * @param topicId - The topic ID for organizing files
   */
  async exportAndUploadFile(
    path: string,
    filename: string,
    topicId: string,
  ): Promise<ExportAndUploadFileResult> {
    void path;
    void filename;
    void topicId;
    void toolsClient;
    throw new Error('Cloud sandbox market API has been removed');
  }
}

export const cloudSandboxService = new CloudSandboxService();
