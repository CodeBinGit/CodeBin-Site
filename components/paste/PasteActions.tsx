'use client';

import { useRef, useState, useTransition } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Check,
  Copy,
  Download,
  FileText,
  GitFork,
  Link2,
  Pencil,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

import { deletePaste } from '@/app/actions';

interface Props {
  pasteId: string;
  code: string;
  filename: string;
  isOwner: boolean;
}

export default function PasteActions({
  pasteId,
  code,
  filename,
  isOwner
}: Props) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [deleting, startDelete] = useTransition();

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Could not access the clipboard');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/pastes/${pasteId}`
      );
      toast.success('Link copied');
    } catch {
      toast.error('Could not access the clipboard');
    }
  };

  const download = () => {
    const url = URL.createObjectURL(
      new Blob([code], { type: 'text/plain;charset=utf-8' })
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const confirmDelete = () =>
    startDelete(async () => {
      const result = await deletePaste(pasteId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      dialog.current?.close();
      toast.success('Paste deleted');
      router.push('/my-pastes');
      router.refresh();
    });

  return (
    <div className="flex flex-wrap items-center gap-1">
      <button
        className="btn btn-ghost btn-sm"
        onClick={copyCode}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? (
          <Check className="text-success size-4" />
        ) : (
          <Copy className="size-4" />
        )}
        <span className="hidden md:inline">{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <button
        className="btn btn-ghost btn-sm"
        onClick={copyLink}
        title="Copy link"
      >
        <Link2 className="size-4" />
        <span className="hidden md:inline">Share</span>
      </button>
      <a
        className="btn btn-ghost btn-sm"
        href={`/api/pastes/raw/${pasteId}`}
        target="_blank"
        rel="noreferrer"
        title="View raw"
      >
        <FileText className="size-4" />
        <span className="hidden md:inline">Raw</span>
      </a>
      <button
        className="btn btn-ghost btn-sm"
        onClick={download}
        title="Download"
      >
        <Download className="size-4" />
        <span className="sr-only">Download</span>
      </button>
      <Link
        className="btn btn-ghost btn-sm"
        href={`/?fork=${encodeURIComponent(pasteId)}`}
        title="Fork into a new paste"
      >
        <GitFork className="size-4" />
        <span className="sr-only">Fork</span>
      </Link>

      {isOwner && (
        <>
          <div className="bg-line mx-1 h-5 w-px" />
          <Link
            className="btn btn-ghost btn-sm"
            href={`/pastes/edit/${pasteId}`}
          >
            <Pencil className="size-4" />
            <span className="hidden md:inline">Edit</span>
          </Link>
          <button
            className="btn btn-ghost btn-sm hover:!text-danger"
            onClick={() => dialog.current?.showModal()}
            title="Delete"
          >
            <Trash2 className="size-4" />
            <span className="sr-only">Delete</span>
          </button>

          <dialog
            ref={dialog}
            className="card text-fg m-auto w-[min(92vw,420px)] p-6 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
            onClick={e =>
              e.target === dialog.current && dialog.current?.close()
            }
          >
            <h2 className="text-lg font-semibold">Delete this paste?</h2>
            <p className="text-muted mt-2 text-sm">
              This permanently removes the paste and its link. This can't be
              undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => dialog.current?.close()}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting…' : 'Delete paste'}
              </button>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
}
