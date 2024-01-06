import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useUser } from "@/ecommerce/context/UserContext/UserContext";
import TextField from "@mui/material/TextField";
import StarRating from "../StarRating/StarRating";

export default function ReviewModal({ isOpen, closeModal, onSave }) {
  const router = useRouter();
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(4);

  const { getCurrentUserInfo } = useUser();

  useEffect(() => {
    setHeadline("");
    setReview("");
    setRating("");
  }, []);

  const submitNewComment = () => {
    const loggedInUser = getCurrentUserInfo();
    if (!headline || !review || !rating) return;
    const userId = loggedInUser?._id;

    if (!userId) {
      router.push("/login");
      return;
    }
    const username = loggedInUser?.firstname + " " + loggedInUser?.lastname;
    const commentData = {
      userId,
      username,
      headline,
      review,
      rating,
    };
    onSave(commentData);
    closeModal();
    setHeadline("");
    setReview("");
    setRating("");
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Review
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Add details for your&#39;s product review
                    </p>
                  </div>

                  <div className="mt-[20px] w-[100%]">
                    <TextField
                      id="standard-basic"
                      label="Headline"
                      variant="standard"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      style={{ width: "100%" }}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mt-[20px] w-[100%]">
                    <TextField
                      id="standard-basic"
                      label="Review"
                      variant="standard"
                      value={review}
                      multiline={true}
                      rows={4}
                      onChange={(e) => setReview(e.target.value)}
                      style={{ width: "100%" }}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mt-[20px] w-[100%]">
                    <StarRating setRating={setRating} />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => submitNewComment()}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
