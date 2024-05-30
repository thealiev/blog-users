import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchPosts } from '../../redux/slices/post';
import {
    List,
    ListItem,
    TextField,
    Typography,
    CardContent,
    Box,
    CircularProgress,
    InputAdornment,
    useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';

const SearchInput = () => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.posts.searchResults);
    const isLoading = useSelector((state) => state.posts.isLoading);
    const error = useSelector((state) => state.posts.error);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const [searchTerm, setSearchTerm] = useState('');
    const theme = useTheme();

    useEffect(() => {
        const debouncedSearch = debounce((term) => {
            if (term.trim() !== '') {
                dispatch(fetchSearchPosts(term.trim()));
            }
        }, 300);

        debouncedSearch(searchTerm);

        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, dispatch]);

    if (!isAuth) {
        return null;
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Box sx={{ position: 'relative', width: '40%' }}>
            <TextField
                fullWidth
                disableUnderline
                variant="outlined"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {isLoading && <CircularProgress size={20} />}
                        </InputAdornment>
                    ),
                }}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }}
            />
            {error && <Typography color="error">{t('search.error')}</Typography>}
            {searchTerm && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: 3,
                        zIndex: 1,
                        maxHeight: '300px',
                        overflowY: 'auto',
                        borderRadius: 1,
                        mt: 1,
                    }}
                >
                    {searchResults.length > 0 ? (
                        <List>
                            {searchResults.map((post) => (
                                <ListItem key={post.id}>
                                    <CardContent>
                                        <Typography variant="h6">{post.title}</Typography>
                                        <Typography variant="body2">{post.body}</Typography>
                                    </CardContent>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        !isLoading && (
                            <Typography sx={{ padding: '20px', color: 'red' }}>
                                {t('search.noResults')}
                            </Typography>
                        )
                    )}
                </Box>
            )}
        </Box>
    );
};

export default SearchInput;
