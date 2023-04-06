import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type AddBookInput = {
  addedBy: Scalars['String'];
  author: Scalars['String'];
  categoryId: Array<Scalars['String']>;
  description: Scalars['String'];
  name: Scalars['String'];
  picture?: InputMaybe<Scalars['Upload']>;
  publishDate: Scalars['DateTime'];
};

export type AddBookRating = {
  addedBy: Scalars['String'];
  bookId: Scalars['String'];
  rating: Scalars['Int'];
  review: Scalars['String'];
};

export enum Book_Status {
  Finish = 'FINISH',
  Read = 'READ',
  Reading = 'READING',
  WantToRead = 'WANT_TO_READ'
}

export type Book = {
  __typename?: 'Book';
  _id: Scalars['String'];
  author?: Maybe<Scalars['String']>;
  category: Array<Category>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  publishDate?: Maybe<Scalars['DateTime']>;
  totalRatingCount?: Maybe<Scalars['Int']>;
  totalRatingValue?: Maybe<Scalars['Float']>;
};

export type BookRating = {
  __typename?: 'BookRating';
  _id: Scalars['String'];
  publishDate: Scalars['DateTime'];
  rating: Scalars['Int'];
  review: Scalars['String'];
  totalTimeTaken?: Maybe<Scalars['Int']>;
  user: User;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID'];
  books: Array<Book>;
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
  addBookRating: Array<BookRating>;
  createCategory: Category;
  createUser: User;
  login: Scalars['String'];
  updateCategory: User;
  updateUserBooks: User;
};


export type MutationAddBookArgs = {
  input: AddBookInput;
  picture?: InputMaybe<Scalars['Upload']>;
};


export type MutationAddBookRatingArgs = {
  input: AddBookRating;
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateUserGenre;
};


export type MutationUpdateUserBooksArgs = {
  input: UpdateUserBooks;
};

export type Query = {
  __typename?: 'Query';
  getBookRating: Array<BookRating>;
  getBooks: Array<Book>;
  getBooksByUser: Array<Book>;
  getCategories: Array<Category>;
  getCategoryById: Category;
  getUpdatedMe: User;
  logout: Scalars['Boolean'];
  me: User;
};


export type QueryGetBookRatingArgs = {
  id: Scalars['String'];
};


export type QueryGetBooksArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newRating: BookRating;
};


export type SubscriptionNewRatingArgs = {
  bookId: Scalars['String'];
};

export type UpdateUserBooks = {
  bookId: Scalars['String'];
  status?: InputMaybe<Book_Status>;
};

export type UpdateUserGenre = {
  categoryIds: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  category: Array<Category>;
  email: Scalars['String'];
  name: Scalars['String'];
  userBooks: Array<UserBooks>;
};

export type UserBooks = {
  __typename?: 'UserBooks';
  book?: Maybe<Book>;
  finish_time?: Maybe<Scalars['String']>;
  read_time?: Maybe<Scalars['String']>;
  reading_time?: Maybe<Scalars['String']>;
  status: Book_Status;
  want_to_read_time: Scalars['String'];
};

export type AddBookMutationVariables = Exact<{
  input: AddBookInput;
  picture?: InputMaybe<Scalars['Upload']>;
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'Book', _id: string, name: string, image?: string | null, author?: string | null, description?: string | null, publishDate?: any | null, category: Array<{ __typename?: 'Category', name: string }> } };

export type GetBooksQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: Array<{ __typename?: 'Book', _id: string, name: string, image?: string | null, author?: string | null, description?: string | null, publishDate?: any | null, totalRatingCount?: number | null, totalRatingValue?: number | null, category: Array<{ __typename?: 'Category', name: string }> }> };

export type GetBooksByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksByUserQuery = { __typename?: 'Query', getBooksByUser: Array<{ __typename?: 'Book', _id: string, name: string, image?: string | null, author?: string | null, description?: string | null, publishDate?: any | null, totalRatingCount?: number | null, totalRatingValue?: number | null, category: Array<{ __typename?: 'Category', name: string }> }> };

export type GetBooksByCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksByCategoryQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', _id: string, name: string, books: Array<{ __typename?: 'Book', _id: string, name: string, author?: string | null, description?: string | null, image?: string | null, publishDate?: any | null }> }> };

export type AddBookRatingMutationVariables = Exact<{
  input: AddBookRating;
}>;


export type AddBookRatingMutation = { __typename?: 'Mutation', addBookRating: Array<{ __typename?: 'BookRating', _id: string, rating: number, review: string, publishDate: any, user: { __typename?: 'User', _id: string, name: string } }> };

export type GetBookRatingQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type GetBookRatingQuery = { __typename?: 'Query', getBookRating: Array<{ __typename?: 'BookRating', _id: string, rating: number, review: string, publishDate: any, user: { __typename?: 'User', _id: string, name: string } }> };

export type NewRatingSubscriptionVariables = Exact<{
  bookId: Scalars['String'];
}>;


export type NewRatingSubscription = { __typename?: 'Subscription', newRating: { __typename?: 'BookRating', _id: string, rating: number, review: string, publishDate: any, user: { __typename?: 'User', _id: string, name: string, email: string } } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', _id: string, name: string }> };

export type GetCategoriesWithBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesWithBooksQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', _id: string, name: string, books: Array<{ __typename?: 'Book', _id: string, name: string, author?: string | null, image?: string | null, description?: string | null }> }> };

export type GetCategoryByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', getCategoryById: { __typename?: 'Category', _id: string, name: string, books: Array<{ __typename?: 'Book', _id: string, name: string, author?: string | null, description?: string | null, image?: string | null }> } };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: string };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, email: string, name: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, name: string, email: string, category: Array<{ __typename?: 'Category', _id: string, name: string }> } };

export type GetUpdatedCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUpdatedCurrentUserQuery = { __typename?: 'Query', getUpdatedMe: { __typename?: 'User', _id: string, name: string, email: string, category: Array<{ __typename?: 'Category', _id: string, name: string }>, userBooks: Array<{ __typename?: 'UserBooks', status: Book_Status, want_to_read_time: string, read_time?: string | null, reading_time?: string | null, finish_time?: string | null, book?: { __typename?: 'Book', _id: string, name: string, author?: string | null, description?: string | null, image?: string | null, publishDate?: any | null, totalRatingCount?: number | null, totalRatingValue?: number | null } | null }> } };

export type UpdateUserGenreMutationVariables = Exact<{
  input: UpdateUserGenre;
}>;


export type UpdateUserGenreMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'User', _id: string, name: string, category: Array<{ __typename?: 'Category', _id: string, name: string }> } };

export type UpdateUserBooksMutationVariables = Exact<{
  input: UpdateUserBooks;
}>;


export type UpdateUserBooksMutation = { __typename?: 'Mutation', updateUserBooks: { __typename?: 'User', _id: string, userBooks: Array<{ __typename?: 'UserBooks', status: Book_Status, want_to_read_time: string, read_time?: string | null, reading_time?: string | null, finish_time?: string | null, book?: { __typename?: 'Book', _id: string, name: string, author?: string | null, description?: string | null, image?: string | null, publishDate?: any | null } | null }> } };


export const AddBookDocument = gql`
    mutation addBook($input: AddBookInput!, $picture: Upload) {
  addBook(input: $input, picture: $picture) {
    _id
    name
    image
    author
    description
    publishDate
    category {
      name
    }
  }
}
    `;
export type AddBookMutationFn = Apollo.MutationFunction<AddBookMutation, AddBookMutationVariables>;

/**
 * __useAddBookMutation__
 *
 * To run a mutation, you first call `useAddBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookMutation, { data, loading, error }] = useAddBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useAddBookMutation(baseOptions?: Apollo.MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, options);
      }
export type AddBookMutationHookResult = ReturnType<typeof useAddBookMutation>;
export type AddBookMutationResult = Apollo.MutationResult<AddBookMutation>;
export type AddBookMutationOptions = Apollo.BaseMutationOptions<AddBookMutation, AddBookMutationVariables>;
export const GetBooksDocument = gql`
    query getBooks($id: String) {
  getBooks(id: $id) {
    _id
    name
    image
    author
    description
    publishDate
    totalRatingCount
    totalRatingValue
    category {
      name
    }
  }
}
    `;

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
      }
export function useGetBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export const GetBooksByUserDocument = gql`
    query getBooksByUser {
  getBooksByUser {
    _id
    name
    image
    author
    description
    publishDate
    totalRatingCount
    totalRatingValue
    category {
      name
    }
  }
}
    `;

/**
 * __useGetBooksByUserQuery__
 *
 * To run a query within a React component, call `useGetBooksByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksByUserQuery, GetBooksByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksByUserQuery, GetBooksByUserQueryVariables>(GetBooksByUserDocument, options);
      }
export function useGetBooksByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksByUserQuery, GetBooksByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksByUserQuery, GetBooksByUserQueryVariables>(GetBooksByUserDocument, options);
        }
export type GetBooksByUserQueryHookResult = ReturnType<typeof useGetBooksByUserQuery>;
export type GetBooksByUserLazyQueryHookResult = ReturnType<typeof useGetBooksByUserLazyQuery>;
export type GetBooksByUserQueryResult = Apollo.QueryResult<GetBooksByUserQuery, GetBooksByUserQueryVariables>;
export const GetBooksByCategoryDocument = gql`
    query getBooksByCategory {
  getCategories {
    _id
    name
    books {
      _id
      name
      author
      description
      image
      publishDate
    }
  }
}
    `;

/**
 * __useGetBooksByCategoryQuery__
 *
 * To run a query within a React component, call `useGetBooksByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksByCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksByCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksByCategoryQuery, GetBooksByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksByCategoryQuery, GetBooksByCategoryQueryVariables>(GetBooksByCategoryDocument, options);
      }
export function useGetBooksByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksByCategoryQuery, GetBooksByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksByCategoryQuery, GetBooksByCategoryQueryVariables>(GetBooksByCategoryDocument, options);
        }
export type GetBooksByCategoryQueryHookResult = ReturnType<typeof useGetBooksByCategoryQuery>;
export type GetBooksByCategoryLazyQueryHookResult = ReturnType<typeof useGetBooksByCategoryLazyQuery>;
export type GetBooksByCategoryQueryResult = Apollo.QueryResult<GetBooksByCategoryQuery, GetBooksByCategoryQueryVariables>;
export const AddBookRatingDocument = gql`
    mutation addBookRating($input: AddBookRating!) {
  addBookRating(input: $input) {
    _id
    rating
    review
    publishDate
    user {
      _id
      name
    }
  }
}
    `;
export type AddBookRatingMutationFn = Apollo.MutationFunction<AddBookRatingMutation, AddBookRatingMutationVariables>;

/**
 * __useAddBookRatingMutation__
 *
 * To run a mutation, you first call `useAddBookRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookRatingMutation, { data, loading, error }] = useAddBookRatingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddBookRatingMutation(baseOptions?: Apollo.MutationHookOptions<AddBookRatingMutation, AddBookRatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookRatingMutation, AddBookRatingMutationVariables>(AddBookRatingDocument, options);
      }
export type AddBookRatingMutationHookResult = ReturnType<typeof useAddBookRatingMutation>;
export type AddBookRatingMutationResult = Apollo.MutationResult<AddBookRatingMutation>;
export type AddBookRatingMutationOptions = Apollo.BaseMutationOptions<AddBookRatingMutation, AddBookRatingMutationVariables>;
export const GetBookRatingDocument = gql`
    query getBookRating($input: String!) {
  getBookRating(id: $input) {
    _id
    rating
    review
    publishDate
    user {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetBookRatingQuery__
 *
 * To run a query within a React component, call `useGetBookRatingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookRatingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookRatingQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBookRatingQuery(baseOptions: Apollo.QueryHookOptions<GetBookRatingQuery, GetBookRatingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookRatingQuery, GetBookRatingQueryVariables>(GetBookRatingDocument, options);
      }
export function useGetBookRatingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookRatingQuery, GetBookRatingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookRatingQuery, GetBookRatingQueryVariables>(GetBookRatingDocument, options);
        }
export type GetBookRatingQueryHookResult = ReturnType<typeof useGetBookRatingQuery>;
export type GetBookRatingLazyQueryHookResult = ReturnType<typeof useGetBookRatingLazyQuery>;
export type GetBookRatingQueryResult = Apollo.QueryResult<GetBookRatingQuery, GetBookRatingQueryVariables>;
export const NewRatingDocument = gql`
    subscription NewRating($bookId: String!) {
  newRating(bookId: $bookId) {
    _id
    rating
    review
    publishDate
    user {
      _id
      name
      email
    }
  }
}
    `;

/**
 * __useNewRatingSubscription__
 *
 * To run a query within a React component, call `useNewRatingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewRatingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewRatingSubscription({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useNewRatingSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewRatingSubscription, NewRatingSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewRatingSubscription, NewRatingSubscriptionVariables>(NewRatingDocument, options);
      }
export type NewRatingSubscriptionHookResult = ReturnType<typeof useNewRatingSubscription>;
export type NewRatingSubscriptionResult = Apollo.SubscriptionResult<NewRatingSubscription>;
export const GetCategoriesDocument = gql`
    query getCategories {
  getCategories {
    _id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoriesWithBooksDocument = gql`
    query getCategoriesWithBooks {
  getCategories {
    _id
    name
    books {
      _id
      name
      author
      image
      description
    }
  }
}
    `;

/**
 * __useGetCategoriesWithBooksQuery__
 *
 * To run a query within a React component, call `useGetCategoriesWithBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesWithBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesWithBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesWithBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesWithBooksQuery, GetCategoriesWithBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesWithBooksQuery, GetCategoriesWithBooksQueryVariables>(GetCategoriesWithBooksDocument, options);
      }
export function useGetCategoriesWithBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesWithBooksQuery, GetCategoriesWithBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesWithBooksQuery, GetCategoriesWithBooksQueryVariables>(GetCategoriesWithBooksDocument, options);
        }
export type GetCategoriesWithBooksQueryHookResult = ReturnType<typeof useGetCategoriesWithBooksQuery>;
export type GetCategoriesWithBooksLazyQueryHookResult = ReturnType<typeof useGetCategoriesWithBooksLazyQuery>;
export type GetCategoriesWithBooksQueryResult = Apollo.QueryResult<GetCategoriesWithBooksQuery, GetCategoriesWithBooksQueryVariables>;
export const GetCategoryByIdDocument = gql`
    query getCategoryById($id: String!) {
  getCategoryById(id: $id) {
    _id
    name
    books {
      _id
      name
      author
      description
      image
    }
  }
}
    `;

/**
 * __useGetCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
      }
export function useGetCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export type GetCategoryByIdQueryHookResult = ReturnType<typeof useGetCategoryByIdQuery>;
export type GetCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdLazyQuery>;
export type GetCategoryByIdQueryResult = Apollo.QueryResult<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($input: LoginUserInput!) {
  login(input: $input)
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    _id
    email
    name
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LogoutDocument = gql`
    query logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  me {
    _id
    name
    email
    category {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUpdatedCurrentUserDocument = gql`
    query getUpdatedCurrentUser {
  getUpdatedMe {
    _id
    name
    email
    category {
      _id
      name
    }
    userBooks {
      book {
        _id
        name
        author
        description
        image
        publishDate
        totalRatingCount
        totalRatingValue
      }
      status
      want_to_read_time
      read_time
      reading_time
      finish_time
    }
  }
}
    `;

/**
 * __useGetUpdatedCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetUpdatedCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpdatedCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpdatedCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUpdatedCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUpdatedCurrentUserQuery, GetUpdatedCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpdatedCurrentUserQuery, GetUpdatedCurrentUserQueryVariables>(GetUpdatedCurrentUserDocument, options);
      }
export function useGetUpdatedCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpdatedCurrentUserQuery, GetUpdatedCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpdatedCurrentUserQuery, GetUpdatedCurrentUserQueryVariables>(GetUpdatedCurrentUserDocument, options);
        }
export type GetUpdatedCurrentUserQueryHookResult = ReturnType<typeof useGetUpdatedCurrentUserQuery>;
export type GetUpdatedCurrentUserLazyQueryHookResult = ReturnType<typeof useGetUpdatedCurrentUserLazyQuery>;
export type GetUpdatedCurrentUserQueryResult = Apollo.QueryResult<GetUpdatedCurrentUserQuery, GetUpdatedCurrentUserQueryVariables>;
export const UpdateUserGenreDocument = gql`
    mutation updateUserGenre($input: UpdateUserGenre!) {
  updateCategory(input: $input) {
    _id
    name
    category {
      _id
      name
    }
  }
}
    `;
export type UpdateUserGenreMutationFn = Apollo.MutationFunction<UpdateUserGenreMutation, UpdateUserGenreMutationVariables>;

/**
 * __useUpdateUserGenreMutation__
 *
 * To run a mutation, you first call `useUpdateUserGenreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserGenreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserGenreMutation, { data, loading, error }] = useUpdateUserGenreMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserGenreMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserGenreMutation, UpdateUserGenreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserGenreMutation, UpdateUserGenreMutationVariables>(UpdateUserGenreDocument, options);
      }
export type UpdateUserGenreMutationHookResult = ReturnType<typeof useUpdateUserGenreMutation>;
export type UpdateUserGenreMutationResult = Apollo.MutationResult<UpdateUserGenreMutation>;
export type UpdateUserGenreMutationOptions = Apollo.BaseMutationOptions<UpdateUserGenreMutation, UpdateUserGenreMutationVariables>;
export const UpdateUserBooksDocument = gql`
    mutation updateUserBooks($input: UpdateUserBooks!) {
  updateUserBooks(input: $input) {
    _id
    userBooks {
      book {
        _id
        name
        author
        description
        image
        publishDate
      }
      status
      want_to_read_time
      read_time
      reading_time
      finish_time
    }
  }
}
    `;
export type UpdateUserBooksMutationFn = Apollo.MutationFunction<UpdateUserBooksMutation, UpdateUserBooksMutationVariables>;

/**
 * __useUpdateUserBooksMutation__
 *
 * To run a mutation, you first call `useUpdateUserBooksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserBooksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserBooksMutation, { data, loading, error }] = useUpdateUserBooksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserBooksMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserBooksMutation, UpdateUserBooksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserBooksMutation, UpdateUserBooksMutationVariables>(UpdateUserBooksDocument, options);
      }
export type UpdateUserBooksMutationHookResult = ReturnType<typeof useUpdateUserBooksMutation>;
export type UpdateUserBooksMutationResult = Apollo.MutationResult<UpdateUserBooksMutation>;
export type UpdateUserBooksMutationOptions = Apollo.BaseMutationOptions<UpdateUserBooksMutation, UpdateUserBooksMutationVariables>;