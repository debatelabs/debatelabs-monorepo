// export function apiDecorator<T extends object, P = void>(
//   serviceMethod: (props: P) => Promise<ResponseDTO<T>>
// ): (props: P) => Promise<ResponseSuccessDTO<T> | ResponseFailDTO> {
//   return async (props) => {
//     try {
//       const response = await serviceMethod(props);
//       if (!response.success) throw new Error(response.message);

//       return ResponseMapper.toSuccessDTO(response?.data);
//     } catch (err) {
//       const error = (err instanceof Error && err.message) || errors.badRequest;
//       console.error(error);

//       // store.dispatch(setTimedAppError(ErrorMapper.toAppErrorDTO(error)));

//       return ResponseMapper.toFailDTO(error);
//     }
//   };
// }
