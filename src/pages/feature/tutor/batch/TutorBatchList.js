import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacherBatch } from '../../../../redux/reducers/tuionPost/uploadBatchSlice';
import { formatDate } from '../../../../redux/utilities/helper';

const TutorBatchList = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user.user);
    const { tutorBatches } = useSelector((state) => state.uploadPost);
    useEffect(() => {
      dispatch(fetchTeacherBatch({ token }));
    }, [dispatch, token]);
    return (
        <div className="w-full ">
      <h2 className="text-start text-lg font-semibold text-gray-700 capitalize dark:text-white">
        My Batch List
      </h2>
      <section className="w-full  mx-auto ">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Batch
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Subject
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 text-start"
                      >
                        Days
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {tutorBatches?.map((dt) => (
                      <tr>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-start text-gray-500 dark:text-gray-400">
                              {formatDate(dt.createdAt)}
                            </p>
                          </div>
                        </td>
                        <td className=" text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">
                              {dt.name}
                              {/* Hello */}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="text-start font-medium text-gray-800 dark:text-white ">
                              {dt.subject}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <h2 className="text-start text-green-500">
                            {" "}
                            {dt.days}
                          </h2>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default TutorBatchList;