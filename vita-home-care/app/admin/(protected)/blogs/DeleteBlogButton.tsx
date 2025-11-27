'use client';

import { useState } from 'react';
import { deleteBlogPostAction } from './actions';
import { useRouter } from 'next/navigation';

type DeleteBlogButtonProps = {
    blogId: string;
    blogTitle: string;
};

export function DeleteBlogButton({ blogId, blogTitle }: DeleteBlogButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteBlogPostAction(blogId);
            if (result.success) {
                router.refresh();
            } else {
                alert(`Failed to delete blog post: ${result.error}`);
                setIsDeleting(false);
            }
        } catch (error) {
            alert(`Error deleting blog post: ${error}`);
            setIsDeleting(false);
        }
    };

    if (showConfirm) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    <h3 className="text-xl font-onest font-bold text-[#2c254c] mb-2">
                        Delete Blog Post?
                    </h3>
                    <p className="text-sm text-[#4f4865] font-onest mb-6">
                        Are you sure you want to delete <strong>&quot;{blogTitle}&quot;</strong>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => setShowConfirm(false)}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-onest font-semibold text-[#4f4865] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-onest font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-onest font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
        </button>
    );
}
