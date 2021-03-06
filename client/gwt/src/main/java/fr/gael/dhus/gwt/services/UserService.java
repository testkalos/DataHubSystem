/*
 * Data Hub Service (DHuS) - For Space data distribution.
 * Copyright (C) 2013,2014,2015 GAEL Systems
 *
 * This file is part of DHuS software sources.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package fr.gael.dhus.gwt.services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.google.gwt.user.client.rpc.RemoteService;

import fr.gael.dhus.gwt.share.CountryData;
import fr.gael.dhus.gwt.share.ProductData;
import fr.gael.dhus.gwt.share.SearchData;
import fr.gael.dhus.gwt.share.UserData;
import fr.gael.dhus.gwt.share.exceptions.AccessDeniedException;
import fr.gael.dhus.gwt.share.exceptions.UserServiceException;
import fr.gael.dhus.gwt.share.exceptions.UserServiceMailingException;
import fr.gael.dhus.gwt.share.exceptions.UserServiceNotExistingException;

public interface UserService extends RemoteService
{
   public List<UserData> getUsers (int start, int count, String filter)
      throws UserServiceException, AccessDeniedException;

   public Integer count (String filter) throws UserServiceException, AccessDeniedException;

   public void createUser (UserData userData) throws UserServiceException,
      UserServiceMailingException, AccessDeniedException;

   public void createTmpUser (UserData userData) throws UserServiceException,
      UserServiceMailingException, AccessDeniedException;

   public void updateUser (UserData userData) throws UserServiceException,
      UserServiceMailingException, AccessDeniedException;

   public void deleteUser (Long id) throws UserServiceException,
      UserServiceMailingException, AccessDeniedException;

   public UserData getUser (Long id) throws UserServiceException, AccessDeniedException;

   public UserData getUserWithDataAccess (Long id) throws UserServiceException, AccessDeniedException;

   public void updateDataAccess(UserData userData) throws UserServiceException, AccessDeniedException;
   
   public void forgotPassword(UserData userData) throws UserServiceException,
      UserServiceMailingException, UserServiceNotExistingException, AccessDeniedException;
   
   public void selfUpdateUser (UserData userData) throws UserServiceException,
      UserServiceMailingException, AccessDeniedException;
   
   public void selfChangePassword(Long id, String oldPassword, String newPassword) throws UserServiceException,
      UserServiceMailingException, AccessDeniedException;
   
   public void storeUserSearch (Long id, String search, String footprint, HashMap<String, String> advanced, String complete) throws UserServiceException, AccessDeniedException;
   
   public void removeUserSearch (Long uId, Long sId) throws UserServiceException, AccessDeniedException;
   
   public List<SearchData> getAllUserSearches (Long uId) throws UserServiceException, AccessDeniedException;
   
   public int countUserSearches (Long uId) throws UserServiceException, AccessDeniedException;
   
   public List<SearchData> scrollSearchesOfUser (int start, int count, Long uId)
            throws UserServiceException, AccessDeniedException;
   
   public void clearSavedSearches (Long uId) throws UserServiceException, AccessDeniedException;
   
   public List<ProductData> getUploadedProducts(int start, int count, Long uId) throws UserServiceException, AccessDeniedException;
   public List<String> getUploadedProductsIdentifiers(int start, int count, Long uId) throws UserServiceException, AccessDeniedException;
   public int countUploadedProducts (Long uId) throws UserServiceException, AccessDeniedException;
   
   public void activateUserSearchNotification (Long sId, boolean notify) throws UserServiceException, AccessDeniedException;
   
   public Date getNextScheduleSearch() throws UserServiceException, AccessDeniedException;

   public List<UserData> getAllUsers (int start, int count, String filter)
      throws UserServiceException, AccessDeniedException;

   public Integer countAll (String filter) throws UserServiceException, AccessDeniedException;
   
   public Boolean checkUserCodeForPasswordReset(String code) throws UserServiceException, AccessDeniedException;
   
   public void resetPassword(String code, String newPassword) throws UserServiceException,
   UserServiceMailingException, AccessDeniedException;
   
   public boolean isDataPublic() throws UserServiceException, AccessDeniedException;

   public List<UserData> getUsersForDataRight (int start, int count, String filter)
      throws UserServiceException, AccessDeniedException;

   public Integer countForDataRight (String filter) throws UserServiceException, AccessDeniedException;

   public UserData getPublicData() throws UserServiceException, AccessDeniedException;
   
   public List<CountryData> getCountries () throws UserServiceException, AccessDeniedException;
   
   public UserData getCurrentUserInformation () throws UserServiceException, AccessDeniedException;
}
